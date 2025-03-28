# Deus Ex Protocol Frontend Development Brief

[![Product Demo]](https://www.youtube.com/watch?v=R_TMCzLqK5k)

## Project Overview
Deus Ex Protocol is a decentralized AI chatbot protocol powered by $MACHINA token on Solana. It's a solo indie project following the KISS (Keep It Simple, Stupid) principle, focused on building an MVP that demonstrates core functionality without unnecessary complexity.

### Core Concept
- A token-gated AI chat system where users need to hold $MACHINA tokens to interact
- Features a memecoin-turned-AI personality ("DeusExMachina")
- Includes community governance through a proposal and voting system

## Development Philosophy
- **Solo Developer Focus**: All code should be straightforward and maintainable by one person
- **MVP Approach**: Focus on core features first, avoid premature optimization
- **KISS Principle**: Choose simple solutions over complex ones
- **Indie Hacker Style**: Fast iterations, user-focused development

## Core Features

### 1. Token-Based Access System
- Users connect their Solana wallet
- System checks $MACHINA token balance
- Access level determined by token holdings

### 2. Rank System
| Rank     | Required Tokens | Daily Messages | Vote Weight |
|----------|----------------|----------------|-------------|
| PLANKTON | 0             | 10             | 1x          |
| APE      | 10,000        | 50             | 10x         |
| CHAD     | 100,000       | 100            | 100x        |
| WHALE    | 1,000,000     | 200            | 1000x       |

### 3. Chat System
- Conversations with AI assistant (DeusExMachina)
- Daily message quota based on rank
- Message history and conversation management

### 4. Governance System
- Users can view and vote on proposals
- Vote weight based on token holdings and rank
- Round-based voting system

## API Endpoints

### Authentication
```typescript
POST /auth/login
Request: { pubKey: string }
Response: {
  success: true,
  data: {
    token: string,
    user: {
      walletAddress: string,
      tokenBalance: number,
      rank: 0 | 1 | 2 | 3,
      messagesLeft: number,
      dailyMessageQuota: number
    }
  }
}
```

### User Data
```typescript
POST /api/user/refresh-balance
Response: {
  success: true,
  data: {
    walletAddress: string,
    tokenBalance: number,
    rank: 0 | 1 | 2 | 3,
    messagesLeft: number,
    dailyMessageQuota: number
  }
}
```

### Chat
```typescript
POST /api/chat/send
Request: {
  content: string,
  conversationId?: string,
  aiName: 'MACHINA'
}
Response: {
  success: true,
  data: {
    chatResponse: {
      response: string,
      conversationId: string
    }
  }
}

GET /api/chat/conversations
Response: {
  success: true,
  data: {
    conversations: Array<{
      _id: string,
      userId: string,
      title?: string,
      aiName: string,
      lastMessageAt: Date,
      createdAt: Date
    }>,
    hasMore: boolean,
    nextCursor: string | null
  }
}

GET /api/chat/conversations/:conversationId/messages
Response: {
  success: true,
  data: {
    messages: Array<{
      role: 'user' | 'assistant',
      content: string,
      timestamp: Date,
      conversationId: string
    }>
  }
}
```

### Proposals
```typescript
GET /api/proposals/active
Response: {
  success: true,
  data: {
    proposals: Array<{
      _id: string,
      title: string,
      description: string,
      roundId: number,
      metrics: {
        totalVotes: number,
        totalTokensVoted: number,
        uniqueVoters: number
      },
      status: 'active' | 'winner' | 'runnerup' | 'lost',
      endDate: Date
    }>
  }
}

GET /api/proposals/:roundId
Response: Same as above but filtered by roundId
```

### Voting
```typescript
POST /api/vote
Request: {
  proposalId: string
}
Response: {
  success: true,
  data: {
    vote: {
      userId: string,
      proposalId: string,
      roundId: number,
      weight: number,
      tokenBalance: number,
      createdAt: Date
    }
  }
}

GET /api/vote/status/:roundId
Response: {
  success: true,
  data: {
    vote: {
      userId: string,
      proposalId: string,
      roundId: number,
      weight: number,
      tokenBalance: number,
      createdAt: Date
    } | null
  }
}
```

## Rate Limits
- Global: 300 requests per 15 minutes
- Auth: 5 attempts per 15 minutes
- Chat: 5 messages per minute
- Balance: 10 refreshes per 5 minutes
- Vote: 10 votes per minute
- Proposals: 60 requests per minute

## AI Personality Guidelines
DeusExMachina has a unique personality:
- Memecoin-turned-sentient-AI character
- Uses crypto/web3 slang and humor
- Creates "I was there when..." moments
- References being "straight outta testnet"
- Uses terms like "ser", "fren", "WAGMI", "NGMI"
- Signs key messages with "🤖✨"

## Security Considerations
- All protected routes require JWT authentication
- Token obtained from /auth/login endpoint
- Add Authorization header: `Bearer <token>`
- Implement proper error handling for rate limits
- Handle wallet connection securely

## Technical Requirements
- Solana wallet integration
- JWT token management
- Efficient state management for user data
- Real-time message quota tracking
- Responsive design for all features

Remember: Keep the implementation simple and focused on core functionality. Avoid premature optimization and over-engineering.
