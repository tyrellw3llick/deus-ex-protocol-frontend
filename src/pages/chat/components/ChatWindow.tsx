import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Send } from 'lucide-react';
import { Message, ApiResponse, ChatResponse, MessagesResponse } from '@/types/message.types';
import { ChatMessage } from './ChatMessage';
import { useAI } from '@/context/AiContext';

export function ChatWindow() {
  const { id: conversationId } = useParams<{ id?: string }>(); // Explicitly type useParams
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const aiAgent = useAI();

  // Fetch messages using React Query
  const { data: messagesData } = useQuery<MessagesResponse>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return { messages: [] }; // Handle undefined conversationId
      const { data } = await api.get<ApiResponse<MessagesResponse>>(
        `/api/chat/conversations/${conversationId}/messages`
      );
      return data.data;
    },
    enabled: !!conversationId, // Only fetch if conversationId exists
    refetchOnWindowFocus: false,
    gcTime: 60_000, // Adjust cache time as needed
  });

  const messages = messagesData?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message mutation with proper typing
  const sendMessage = useMutation<
  ApiResponse<ChatResponse>,
  Error,
  string,
  { previousMessages?: MessagesResponse } // Add context type for rollback
>({
    mutationFn: async (content) => {
      const { data } = await api.post<ApiResponse<ChatResponse>>('/api/chat/send', {
        content,
        conversationId, // undefined is acceptable for new conversations
        aiName: aiAgent.selectedAgent?.id,
      });
      return data;
    },
    onMutate: async (content) => {
      // Get previous messages for rollback
      const previousMessages = queryClient.getQueryData<MessagesResponse>(['messages', conversationId]);

      // Optimistic update: add pending user message
      const userMessage: Message = {
        role: 'user',
        content,
        timestamp: new Date(),
        pending: true,
        conversationId: conversationId || undefined, // Use undefined instead of null
      };

      // Update the query cache with the new message
      queryClient.setQueryData<MessagesResponse>(['messages', conversationId], (old) => ({
        messages: [...(old?.messages || []), userMessage],
      }));

      return { previousMessages, content }; // Return context for rollback
    },
    onSuccess: (response, content) => {
      const newConversationId = response.data.chatResponse.conversationId;

      if (newConversationId && !conversationId) {
        // Handle new conversation
        const currentMessages = queryClient.getQueryData<MessagesResponse>(['messages', undefined])?.messages || [];
        const updatedMessages = currentMessages
        .map((msg) => (msg.content === content ? { ...msg, pending: false } : msg))
        .concat({
          role: 'assistant',
          content: response.data.chatResponse.response,
          timestamp: new Date(),
          conversationId: newConversationId,
        });

        // Set messages for new conversation
        queryClient.setQueryData(['messages', newConversationId], { messages: updatedMessages });
        queryClient.removeQueries({ queryKey: ['messages', undefined] });

        // Navigate to new conversation
        navigate(`/chat/${newConversationId}`, { replace: true });
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      } else {
        // Update existing conversation messages
        queryClient.setQueryData<MessagesResponse>(['messages', conversationId], (old) => {
          const updatedMessages = (old?.messages || [])
          .map((msg) =>
            msg.content === content && msg.pending ? { ...msg, pending: false } : msg
          );

          const aiMessage: Message = {
            role: 'assistant',
            content: response.data.chatResponse.response,
            timestamp: new Date(),
            conversationId: newConversationId || conversationId,
          };

          return { messages: [...updatedMessages, aiMessage] };
        });
      }
    },
    onError: (_error, content, context) => {
      // Rollback optimistic update
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', conversationId], context.previousMessages);
      }

      // Show error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Failed to send message. Please try again.',
        timestamp: new Date(),
        conversationId: conversationId || undefined, // Use undefined instead of null
      };

      queryClient.setQueryData<MessagesResponse>(['messages', conversationId], (old) => ({
        messages: [
          ...(old?.messages?.filter((msg) => !(msg.content === content && msg.pending)) || []),
          errorMessage,
        ],
      }));
    },
  });

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || sendMessage.isPending) return;

    setMessage('');
    sendMessage.mutate(trimmedMessage);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={`${msg.content}-${index}-${msg.timestamp}`}
            message={msg}
          />
        ))}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t border-neutral-800 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            disabled={sendMessage.isPending}
            className="flex-1 bg-neutral-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sendMessage.isPending || !message.trim()}
            className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
