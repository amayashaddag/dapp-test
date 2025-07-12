import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/market_place/MarketPlacePage';
import SocialFeed from './pages/feed_page/feed';
import NavBar from './components/NavBar';

function App() {
    const userProfile = {
    name: 'Alex Bernard',
    avatar: 'AB',
    chzBalance: '1,247.50',
    fanTokens: 720,
    nfts: 12
  };

  return (
     <>
    <Router>
      <NavBar userProfile={userProfile} />
      <Routes>
        <Route path="/" element={<SocialFeed />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
      </Routes>
    </Router>
    </>
    // <MarketplacePage />
  );
}

export default App;