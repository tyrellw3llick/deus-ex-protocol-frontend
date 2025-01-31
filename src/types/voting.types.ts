export interface Proposal {
  _id: string;
  title: string;
  description: string;
  roundId: number;
  metrics: {
    totalVotes: number;
    totalTokensVoted: number;
    uniqueVoters: number;
  };
  status: 'active' | 'winner' | 'runnerup' | 'lost';
  endDate: string;
}

export interface Vote {
  _id: string;
  userId: string;
  proposalId: {
    _id: string;
    title: string;
    description: string;
    roundId: number;
    status: string;
    endDate: string;
  };
  roundId: number;
  weight: number;
  tokenBalance: number;
  createdAt: string;
}

export interface ProposalsResponse {
  success: true;
  data: {
    proposals: Proposal[];
  };
}

export interface VoteResponse {
  success: true;
  data: {
    vote: Vote;
  };
}

export interface VoteStatusResponse {
  success: true;
  data: {
    vote: Vote | null;
  };
}
