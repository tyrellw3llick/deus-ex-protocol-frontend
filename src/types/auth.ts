// User data shape
export interface User {
  walletAddress: string;
  tokenBalance: number;
  rank: 0 | 1 | 2 | 3; // 0: PLANKTON, 1: APE, 2: CHAD, 3: WHALE
  messagesLeft: number;
  dailyMessageQuota: number;
}

// Auth endpoint response shape
export interface AuthResponse {
  success: true;
  data: {
    token: string;
    user: User;
  };
}
