import React, { useState } from 'react';
import { Wallet, Trophy, TrendingUp, Users, Star, ChevronRight, ChevronDown, Ticket, MapPin } from 'lucide-react';
import TicketsSection from './ticketsPage';
import FanTokenHistoryMap from './map';
import { AnimatePresence, motion } from 'framer-motion';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTickets, setShowTickets] = useState(false);

  // Mock data for fan tokens
  const fanTokens = [
    { id: 1, club: 'PSG', logo: '🔵🔴', tokens: 250, value: '€125' },
    { id: 2, club: 'OM', logo: '🔵⚪', tokens: 180, value: '€90' },
    { id: 3, club: 'OL', logo: '🔵⚪🔴', tokens: 120, value: '€60' },
    { id: 4, club: 'ASSE', logo: '🟢', tokens: 95, value: '€47' },
    { id: 5, club: 'FCN', logo: '🟡🟢', tokens: 75, value: '€38' }
  ];

  const walletData = {
    chzBalance: '1,247.50',
    totalValue: '€623.75',
    fanPoints: '2,850',
    rewards: '47'
  };

  const stats = [
    { label: 'Total Fan Tokens', value: '720', icon: Trophy },
    { label: 'Portfolio Value', value: '€360', icon: TrendingUp },
    { label: 'Active Stakes', value: '5', icon: Star },
    { label: 'Community Rank', value: '#1,247', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
            
            {/* Main Profile Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Side - Fan Tokens */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">Fan Tokens Collection</h3>
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-1">
                      <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-1 p-2">
                          {fanTokens.slice(0, 6).map((token, index) => (
                            <div key={token.id} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs">
                              {token.logo}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                      {fanTokens.length} Clubs
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {fanTokens.map((token) => (
                    <div key={token.id} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 hover:border-purple-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm">
                            {token.logo}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{token.club}</p>
                            <p className="text-xs text-gray-400">{token.tokens} tokens</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-400">{token.value}</p>
                          <p className="text-xs text-gray-400">+2.5%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center - Profile Picture */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 rounded-full p-1">
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold">
                        AB
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
                </div>
                
                <div className="text-center">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Alex Bernard
                  </h1>
                  <p className="text-gray-400">@alexb_fan</p>
                  <div className="flex items-center justify-center space-x-4 mt-2">
                    <span className="text-sm text-gray-300">Level 12</span>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <span className="text-sm text-gray-300">Premium Fan</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 text-center">
                      <stat.icon className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                      <p className="text-sm font-medium">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Wallet */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">Digital Wallet</h3>
                  <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center justify-center mb-4">
                      <Wallet className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">{walletData.chzBalance}</p>
                        <p className="text-sm text-gray-400">CHZ Balance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-green-400">{walletData.totalValue}</p>
                        <p className="text-sm text-gray-400">Total Value</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards Section */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="font-medium mb-3 text-gray-300">Rewards & Points</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Fan Points</span>
                      <span className="text-sm font-medium text-yellow-400">{walletData.fanPoints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Active Rewards</span>
                      <span className="text-sm font-medium text-green-400">{walletData.rewards}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl p-3 font-medium transition-colors">
                    Deposit CHZ
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 rounded-xl p-3 font-medium transition-colors border border-gray-700">
                    Withdraw to Bank
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          
          {/* History Map Placeholder */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <FanTokenHistoryMap />
          </div>

  {/* Tickets Section */}
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
    <button
      onClick={() => setShowTickets(prev => !prev)}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Ticket className="w-6 h-6 text-purple-400" />
        <span className="text-lg font-medium">My Tickets</span>
      </div>
      {showTickets ? (
        <ChevronDown className="w-5 h-5 text-purple-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-purple-400" />
      )}
    </button>

    <AnimatePresence initial={false}>
      {showTickets && (
        <motion.div
          key="tickets"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-4 bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
            <TicketsSection />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

          {/* Social Section Preview */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Fan Community</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm text-gray-400">Following</p>
                <p className="text-xl font-bold text-purple-400">1,247</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm text-gray-400">Followers</p>
                <p className="text-xl font-bold text-blue-400">3,582</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm text-gray-400">Content Created</p>
                <p className="text-xl font-bold text-green-400">156</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;