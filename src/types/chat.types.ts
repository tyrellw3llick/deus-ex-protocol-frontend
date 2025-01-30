// Types for conversations
export interface Conversation {
  _id: string;
  userId: string;
  title?: string;
  aiName: string;
  lastMessageAt: Date;
  createdAt: Date;
}

export interface ConversationsResponse {
  success: true;
  data: {
    conversations: Conversation[];
    nextCursor: string | null;
  };
}

// Type for a single page of conversations
export interface ConversationPage {
  conversations: Conversation[];
  nextCursor: string | null;
}

// Types for AI agents
export interface AIAgent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
}

// Types for AI agents
export interface AIAgent {
  id: string;
  name: string;
  description: string;
}

// Response type for AI agents endpoint
export interface AIAgentsResponse {
  success: true;
  data: {
    agents: AIAgent[];
  };
}
