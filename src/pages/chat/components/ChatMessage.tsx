import { useTypewriter } from '@/hooks/useTypewritter';
import { cn } from '@/lib/utils';
import { Message } from '@/types/message.types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { displayedText, isTyping } = useTypewriter(
    message.content,
    message.role === 'assistant' ? 5 : 0 // Only animate assistant messages
  );

  return (
    <div
      className={cn(
        'flex flex-col max-w-[80%] space-y-2',
        message.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
      )}
    >
      <div
        className={cn(
          'rounded-lg px-4 py-2',
          message.role === 'user'
            ? message.pending
              ? 'bg-primary/70 text-white'
              : 'bg-primary text-white'
            : 'bg-neutral-800 text-neutral-100'
        )}
      >
        {message.role === 'assistant' ? displayedText : message.content}
        {isTyping && message.role === 'assistant' && (
          <span className="inline-block w-1 h-4 ml-1 bg-primary animate-pulse" />
        )}
      </div>
      <span className="text-xs text-neutral-500">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};
