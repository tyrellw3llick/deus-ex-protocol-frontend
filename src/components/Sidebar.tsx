import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquarePlus, Bot, X, LogOut, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { api } from '@/api/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';
import { AIAgent, AI_AGENTS, ConversationsResponse, ConversationPage, Conversation } from '@/types/chat.types';
import { UserData, Rank } from '@/types/user.types';
import { ConversationsLoadingSkeleton } from '@/utils/sidebarSkeletonLoader';
import { useSidebar } from '@/context/SidebarContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 10;

const RANK_BADGES = {
  0: { name: 'PLANKTON', class: 'bg-neutral-600' },
  1: { name: 'APE', class: 'bg-green-600' },
  2: { name: 'CHAD', class: 'bg-blue-600' },
  3: { name: 'WHALE', class: 'bg-purple-600' },
} as const;

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const navigate = useNavigate();
  const { disconnect, publicKey } = useWallet();
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(AI_AGENTS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(() => {
    const stored = sessionStorage.getItem('userData');
    return stored ? JSON.parse(stored) : null;
  });

  // Close sidebar on route change
  useEffect(() => {
    return () => {
      close();
    };
  }, [close]);

  // Format utilities
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat().format(balance);
  };

  // Handle balance refresh
  const handleRefreshBalance = async () => {
    if (isRefreshing) return;
    try {
      setIsRefreshing(true);
      const response = await api.post<{ success: true; data: UserData }>('/api/user/refresh-balance');

      if (response.data.success) {
        setUserData(response.data.data);
        sessionStorage.setItem('userData', JSON.stringify(response.data.data));
      }
    } catch (err) {
      console.error('Failed to refresh balance:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle wallet disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  // Fetch conversations with infinite query
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery<ConversationPage, Error>({
    queryKey: ['conversations'],
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ConversationsResponse>(
        '/api/chat/conversations',
        { 
          params: { 
            cursor: pageParam, 
            limit: PAGE_SIZE 
          } 
        }
      );
      return {
        conversations: response.data.data.conversations,
        nextCursor: response.data.data.nextCursor,
      };
    },
    getNextPageParam: (lastPage: ConversationPage) => lastPage.nextCursor,
  });

  // Handle new conversation
  const handleNewConversation = () => {
    navigate('/chat', { state: { aiName: selectedAgent.id } });
    close();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 md:static h-screen md:h-[calc(100vh-4rem)]",
        "w-80 bg-neutral-900/50 backdrop-blur-xl border-r border-neutral-800",
        "flex flex-col transition-transform duration-300 ease-in-out",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile Header Info */}
        <div className="md:hidden p-4 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">MACHINA</h2>
            <button
              onClick={close}
              className="p-2 text-neutral-400 hover:text-primary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {userData && publicKey && (
            <div className="space-y-2">
              {/* Rank Badge */}
              <div className={cn(
                "inline-block px-3 py-1 rounded-full text-white text-xs font-medium",
                RANK_BADGES[userData.rank as Rank].class
              )}>
                {RANK_BADGES[userData.rank as Rank].name}
              </div>

              {/* Balance */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-400">
                  {formatBalance(userData.tokenBalance)} <span className="text-primary">$MACHINA</span>
                </div>
                <button
                  onClick={handleRefreshBalance}
                  disabled={isRefreshing}
                  className="p-2 text-neutral-400 hover:text-primary disabled:opacity-50"
                >
                  <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                </button>
              </div>

              {/* Wallet */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-400">
                  {formatAddress(publicKey.toString())}
                </div>
                <button
                  onClick={handleDisconnect}
                  className="p-2 text-neutral-400 hover:text-primary"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={handleNewConversation}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {/* AI Agent Selector */}
          <div className="px-4 mb-4">
            <label className="text-xs text-neutral-400 mb-2 block">AI Agent</label>
            <Select 
              value={selectedAgent.id}
              onValueChange={(value) => {
                const agent = AI_AGENTS.find(a => a.id === value);
                if (agent) setSelectedAgent(agent);
              }}
            >
              <SelectTrigger className="bg-neutral-900 border-neutral-800">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className='text-primary'>{selectedAgent.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800">
                {AI_AGENTS.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span className='text-neutral-400'>{agent.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <ConversationsLoadingSkeleton />
            ) : (
                <div className="space-y-1">
                  {data?.pages.map((page, _i) =>
                    page.conversations.map((conversation: Conversation) => (
                      <Link
                        key={conversation._id}
                        to={`/chat/${conversation._id}`}
                        onClick={close}
                        className="block px-4 py-3 hover:bg-neutral-800 transition-colors"
                      >
                        <div className="text-sm text-neutral-200 truncate">
                          {conversation.title || "New Conversation"}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {format(new Date(conversation.lastMessageAt), 'MMM d, yyyy')}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}

            {/* Load More Button */}
            {hasNextPage && (
              <div className="p-4">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="w-full px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors disabled:opacity-50"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
