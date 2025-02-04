import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './pages/landing/LandingPage';
import { ChatPage } from './pages/chat/ChatPage';
import { VotingPage } from './pages/voting/VotingPage';
import { WalletContextProvider } from './context/WalletContextProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AIProvider } from './context/AiContext';
import { Analytics } from '@vercel/analytics/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public route - Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes - Wrapped in WalletContextProvider */}
          <Route path="/*" element={
            <WalletContextProvider>
              <AIProvider>
                <Routes>
                  <Route path="/chat" element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/chat/:id" element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/voting" element={
                    <ProtectedRoute>
                      <VotingPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </AIProvider>
            </WalletContextProvider>
          } />
        </Routes>
        <Analytics />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
