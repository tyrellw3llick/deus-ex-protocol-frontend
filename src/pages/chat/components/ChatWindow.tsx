import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  conversationId: string;
}

export function ChatWindow() {
  const { id: conversationId } = useParams();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messagesData, isLoading, error } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return null;
      const response = await api.get(`/api/chat/conversations/${conversationId}/messages`);
      return response.data.data;
    },
    enabled: !!conversationId,
  });

  // Send message mutation
  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await api.post('/api/chat/send', {
        content,
        conversationId,
        aiName: 'MACHINA'
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      setMessage('');
    },
  });

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    mutation.mutate(message);
  };

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Failed to load messages
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 space-y-4">
        <p className="text-lg">Select a conversation or start a new one</p>
        <p className="text-sm">Your messages with DeusExMachina will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-primary">Loading messages...</div>
          </div>
        ) : (
            messagesData?.messages.map((msg: Message, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col max-w-[80%] space-y-2",
                  msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    msg.role === 'user' 
                      ? "bg-primary text-white" 
                      : "bg-neutral-800 text-neutral-100"
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-xs text-neutral-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-neutral-800 p-4"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-neutral-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !message.trim()}
            className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
