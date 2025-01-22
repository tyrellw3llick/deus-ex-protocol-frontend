import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { ChatPage } from './pages/chat/ChatPage';
import { VotingPage } from './pages/voting/VotingPage';
import { WalletContextProvider } from './context/WalletContextProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - Landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected routes - Wrapped in WalletContextProvider */}
        <Route path="/*" element={
          <WalletContextProvider>
            <Routes>
              <Route path="/chat" element={
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
          </WalletContextProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;
