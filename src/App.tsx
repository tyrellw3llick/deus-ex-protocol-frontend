import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { ChatPage } from './pages/chat/ChatPage';
import { VotingPage } from './pages/voting/VotingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/voting' element={<VotingPage />} />
      </Routes>
    </Router>
  )
}

export default App
