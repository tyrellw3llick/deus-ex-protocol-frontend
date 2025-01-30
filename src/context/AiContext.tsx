import { createContext, useContext, useState, ReactNode } from 'react';
import { AIAgent } from '@/types/chat.types';

interface AIContextType {
  selectedAgent: AIAgent | null;
  setSelectedAgent: (agent: AIAgent | null) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);

  return (
    <AIContext.Provider value={{ selectedAgent, setSelectedAgent }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
