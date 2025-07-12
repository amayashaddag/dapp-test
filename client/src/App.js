import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketplacePage from './pages/market_place/MarketPlacePage';
import SocialFeed from './pages/feed_page/feed';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<SocialFeed />} />
    //     <Route path="/marketplace" element={<MarketplacePage />} />
    //   </Routes>
    // </Router>
    <SocialFeed />
  );
}

export default App;