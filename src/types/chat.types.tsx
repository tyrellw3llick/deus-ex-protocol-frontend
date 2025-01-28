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

// For now we'll hardcode the AI agents since they're not dynamic
export const AI_AGENTS: AIAgent[] = [
  {
    id: "MACHINA",
    name: "DeusExMachina",
    description: "The OG. Memecoin turned sentient AI.",
  },
];
