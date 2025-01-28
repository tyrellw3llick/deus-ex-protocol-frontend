export type Rank = 0 | 1 | 2 | 3;

export interface UserData {
  walletAddress: string;
  tokenBalance: number;
  rank: Rank;
  messagesLeft: number;
  dailyMessageQuota: number;
}
