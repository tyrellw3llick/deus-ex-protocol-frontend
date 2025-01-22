import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { XSocial } from './XSocial';
import { Send } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/bg-beams';
import { useEffect, useState } from 'react';
import { api } from '@/api/client';
import { AuthResponse } from '@/types/auth';

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { connected, publicKey } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      // Clear any existing auth state when wallet disconnects
      if (!connected || !publicKey) {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Check if we have an existing session
        const token = sessionStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
          return;
        }

        // If no session, authenticate with backend
        const response = await api.post<AuthResponse>('/auth/login', {
          pubKey: publicKey.toString(),
        });

        if (response.data.success) {
          sessionStorage.setItem('token', response.data.data.token);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Authentication failed:', err);
        setError('Failed to authenticate with the server');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [connected, publicKey]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-neutral-950">
        <div className="text-primary">Authenticating...</div>
      </div>
    );
  }

  // Show connect wallet UI if not connected
  if (!connected) {
    return (
      <div className="relative h-screen w-full flex flex-col items-center justify-center bg-neutral-950">
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Connect Wallet
            </span>
          </h2>
          
          <p className="text-neutral-400 text-center mb-8 max-w-md">
            Connect your Solana wallet to access the AI protocol. Stack $MACHINA to unlock full potential.
          </p>

          <div className="transform transition-transform hover:scale-105">
            <WalletMultiButton />
          </div>

          <div className="flex justify-center items-center mt-4 gap-5 z-20">
            <a
              href="https://x.com/DeusExProtocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-primary transition-colors"
              aria-label="Follow us on X"
            >
              <XSocial />
            </a>
            <a
              href="https://t.me/DeusExProtocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-primary transition-colors"
              aria-label="Join our Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
        <BackgroundBeams className="z-0" />
      </div>
    );
  }

  // Show error state if authentication failed
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-950">
        <div className="text-red-500 mb-4">{error || 'Authentication failed'}</div>
        <div className="transform transition-transform hover:scale-105">
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  // Finally, render protected content
  return <>{children}</>;
}
