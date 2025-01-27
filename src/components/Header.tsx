import { useNavigate, NavLink } from "react-router-dom";
import { api } from "@/api/client";
import { User } from "@/types/auth";
import { useWallet } from "@solana/wallet-adapter-react"
import { LogOut, MessageSquare, RefreshCw, Vote } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const RANK_BADGES = { 0: { name: 'PLANKTON', class: 'bg-neutral-600' },
  1: { name: 'APE', class: 'bg-green-600' },
  2: { name: 'CHAD', class: 'bg-blue-600' },
  3: { name: 'WHALE', class: 'bg-purple-600' },
} as const

export const Header = () => {
  const { disconnect, publicKey } = useWallet();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState<User | null>(() => {
    const storedData = sessionStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0,4)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat().format(balance);
  }

  const handleRefreshBalance = async () => {
    if (isRefreshing) return;
    try {
      setIsRefreshing(true);
      const response = await api.post<{ success: true, data: User }>('/api/user/refresh-balance');

      if (response.data.success) {
        setUserData(response.data.data);
        sessionStorage.setItem('userData', JSON.stringify(response.data.data));
      }
    } catch (err) {
      console.error('Failed to refresh balance:', err);
    } finally {
      setIsRefreshing(false);
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

    return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
            >
              MACHINA
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/chat"
              className={({ isActive }) => cn(
                'group relative flex items-center space-x-2 transition-colors',
                isActive ? 'text-primary' : 'text-neutral-400 hover:text-primary'
              )}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chat</span>
              <div className={cn(
                'absolute -bottom-[1.5rem] left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-200',
                'scale-x-0 group-hover:scale-x-100'
              )} />
            </NavLink>
            <NavLink
              to="/voting"
              className={({ isActive }) => cn(
                'group relative flex items-center space-x-2 transition-colors',
                isActive ? 'text-primary' : 'text-neutral-400 hover:text-primary'
              )}
            >
              <Vote className="w-4 h-4" />
              <span className="text-sm">Vote</span>
              <div className={cn(
                'absolute -bottom-[1.5rem] left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-200',
                'scale-x-0 group-hover:scale-x-100'
              )} />
            </NavLink>
          </nav>

          {/* User Info & Actions */}
          {publicKey && userData && (
            <div className="flex items-center space-x-4">
              {/* User Stats */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Rank Badge */}
                <div className={`border px-3 py-1 rounded-full text-white text-xs font-medium ${RANK_BADGES[userData.rank].class}`}>
                  {RANK_BADGES[userData.rank].name}
                </div>
                
                {/* Balance */}
                <div className="text-sm text-neutral-400">
                  {formatBalance(userData.tokenBalance)} <span className="text-primary">$MACHINA</span>
                </div>

                {/* Wallet */}
                <div className="text-sm text-neutral-400" title={publicKey.toString()}>
                  {formatAddress(publicKey.toString())}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefreshBalance}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 px-4 py-1.5 text-sm bg-primary hover:bg-primary-dark text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                
                <button
                  onClick={handleDisconnect}
                  className="p-2 text-neutral-400 hover:text-primary rounded-full transition-colors"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
