import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Send } from 'lucide-react';
import { Message, ApiResponse, ChatResponse, MessagesResponse } from '@/types/message.types';
import { useAI } from '@/context/AiContext';
import { ChatMessage } from './ChatMessage';

export function ChatWindow() {
  const { id: conversationId } = useParams<{ id?: string }>();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { selectedAgent } = useAI();

  // Fetch conversation details to get the current conversation's AI agent
  const { data: currentConversation } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return null;
      const { data } = await api.get(`/api/chat/conversations/${conversationId}`);
      return data.data;
    },
    enabled: !!conversationId,
  });

  // Fetch messages
  const { data: messagesData } = useQuery<MessagesResponse>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return { messages: [] };
      const { data } = await api.get<ApiResponse<MessagesResponse>>(
        `/api/chat/conversations/${conversationId}/messages`
      );
      return data.data;
    },
    enabled: !!conversationId,
  });

  const messages = messagesData?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Check if we need to start a new conversation based on selected agent
  const shouldStartNewConversation = () => {
    if (!conversationId) return true;
    if (!currentConversation) return true;
    return currentConversation.aiName !== selectedAgent?.id;
  };

  // Send message mutation
  const sendMessage = useMutation<
  ApiResponse<ChatResponse>,
  Error,
  string,
  { previousMessages?: MessagesResponse }
>({
    mutationFn: async (content) => {
      if (!selectedAgent) throw new Error('No AI agent selected');

      const shouldCreateNew = shouldStartNewConversation();

      const { data } = await api.post<ApiResponse<ChatResponse>>('/api/chat/send', {
        content,
        conversationId: shouldCreateNew ? undefined : conversationId,
        aiName: selectedAgent.id,
      });
      return data;
    },
    onMutate: async (content) => {
      const previousMessages = queryClient.getQueryData<MessagesResponse>(['messages', conversationId]);

      const userMessage: Message = {
        role: 'user',
        content,
        timestamp: new Date(),
        pending: true,
        conversationId: conversationId || undefined,
      };

      queryClient.setQueryData<MessagesResponse>(['messages', conversationId], (old) => ({
        messages: [...(old?.messages || []), userMessage],
      }));

      return { previousMessages, content };
    },
    onSuccess: (response, content) => {
      const newConversationId = response.data.chatResponse.conversationId;
      const isNewConversation = shouldStartNewConversation();

      if (isNewConversation) {
        // Handle new conversation
        const updatedMessages = [
          {
            role: 'user',
            content,
            timestamp: new Date(),
            conversationId: newConversationId,
          },
          {
            role: 'assistant',
            content: response.data.chatResponse.response,
            timestamp: new Date(),
            conversationId: newConversationId,
          }
        ];

        queryClient.setQueryData(['messages', newConversationId], { messages: updatedMessages });
        navigate(`/chat/${newConversationId}`, { replace: true });
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      } else {
        // Update existing conversation messages
        queryClient.setQueryData<MessagesResponse>(['messages', conversationId], (old) => {
          const updatedMessages = (old?.messages || [])
          .map((msg) => (msg.content === content && msg.pending ? { ...msg, pending: false } : msg));

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
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', conversationId], context.previousMessages);
      }

      const errorMessage: Message = {
        role: 'assistant',
        content: 'Failed to send message. Please try again.',
        timestamp: new Date(),
        conversationId: conversationId || undefined,
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

    if (!trimmedMessage || sendMessage.isPending || !selectedAgent) return;

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
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t border-neutral-800 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={selectedAgent ? "Send a message..." : "Select an AI agent to start chatting"}
            disabled={sendMessage.isPending || !selectedAgent}
            className="flex-1 bg-neutral-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sendMessage.isPending || !message.trim() || !selectedAgent}
            className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
