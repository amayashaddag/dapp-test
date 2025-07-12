import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Wallet, 
  Trophy, 
  Image, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  Plus, 
  Search,
  Bell,
  Settings
} from 'lucide-react';
import FanTokenCard from '../market_place/marketPlaceSmallCard';


const SocialFeed = ({showSendModal, setShowSendModal}) => {
  const navigate = useNavigate();
  const [marketplaceIndex, setMarketplaceIndex] = useState(0);

  const marketplaceItems = [
    [
      { id: 1, club: 'PSG', logo: '🔵🔴', price: '0.52', change: '+2.5%', type: 'up' },
      { id: 2, club: 'OM', logo: '🔵⚪', price: '0.48', change: '-1.2%', type: 'down' },
      { id: 3, club: 'OL', logo: '🔵⚪🔴', price: '0.45', change: '+3.1%', type: 'up' },
      { id: 4, club: 'ASSE', logo: '🟢', price: '0.42', change: '+0.8%', type: 'up' }
    ],
    [
      { id: 5, club: 'FCN', logo: '🟡🟢', price: '0.38', change: '+1.5%', type: 'up' },
      { id: 6, club: 'LOSC', logo: '🔴⚪', price: '0.55', change: '-0.5%', type: 'down' },
      { id: 7, club: 'RCS', logo: '🟡🔴', price: '0.33', change: '+2.8%', type: 'up' },
      { id: 8, club: 'FCM', logo: '🔵🟡', price: '0.29', change: '+1.2%', type: 'up' }
    ]
  ];

  const liveStreams = [
    {
      id: 1,
      creator: 'PSG Insider',
      title: 'Match Analysis: PSG vs OM Preview',
      viewers: 1247,
      thumbnail: '🔵🔴',
      isLive: true,
      fanTokenPrice: 5
    },
    {
      id: 2,
      creator: 'Football Analytics',
      title: 'Transfer Market Updates',
      viewers: 832,
      thumbnail: '⚽',
      isLive: true,
      fanTokenPrice: 3
    },
    {
      id: 3,
      creator: 'OL Ultras',
      title: 'Pre-Match Discussion',
      viewers: 456,
      thumbnail: '🔵⚪🔴',
      isLive: false,
      fanTokenPrice: 2
    }
  ];

  const feedPosts = [
    {
      id: 1,
      author: 'PSG Insider',
      avatar: '🔵🔴',
      time: '2h',
      content: 'Breaking: New fan token reward system launching next week! 🚀',
      likes: 234,
      comments: 45,
      shares: 12,
      hasVideo: false
    },
    {
      id: 2,
      author: 'Football Analytics',
      avatar: '⚽',
      time: '4h',
      content: 'Market analysis: PSG tokens showing strong momentum before the derby match.',
      likes: 189,
      comments: 67,
      shares: 23,
      hasVideo: true
    }
  ];

    const handleViewAllMarketplace = () => {
        navigate('/marketplace');
    };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Header */}
 

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Marketplace Section */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Marketplace</h3>
        <button
            onClick={handleViewAllMarketplace} // à définir dans ton code
            className="text-sm font-medium text-purple-400 hover:underline transition-colors"
        >
            View All
        </button>
        </div>

          
        <div className="grid grid-cols-4 gap-4">
        {marketplaceItems[marketplaceIndex].map((item) => (
        <FanTokenCard key={item.id} item={item} />
        ))}

          </div>
        </div>

        {/* Live Streams Section */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Live Streams</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveStreams.map((stream) => (
              <div key={stream.id} className="relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors">
                <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center relative">
                  <div className="text-4xl">{stream.thumbnail}</div>
                  <Play className="absolute w-8 h-8 text-white/80" />
                  {stream.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      LIVE
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{stream.viewers}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-white mb-1">{stream.title}</h4>
                  <p className="text-sm text-gray-400 mb-2">{stream.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Entry: {stream.fanTokenPrice} tokens</span>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Feed */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Community Feed</h3>
            <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 rounded-full px-4 py-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Create Post</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {feedPosts.map((post) => (
              <div key={post.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    {post.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{post.author}</h4>
                    <p className="text-sm text-gray-400">{post.time}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{post.content}</p>
                {post.hasVideo && (
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white/60" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;