// types/message.types.ts
export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  conversationId?: string;
  pending?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ChatResponse {
  chatResponse: {
    response: string;
    conversationId: string;
  };
}

export interface MessagesResponse {
  messages: Message[];
}
