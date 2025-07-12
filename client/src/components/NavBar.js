import React, { useState } from 'react';
import { Wallet, Trophy, Image, Send, Bell, Settings } from 'lucide-react';

const NavBar = ({ userProfile }) => {
      
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendType, setSendType] = useState('chz'); // 'chz' or 'tokens'
  return (
    <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left - Profile */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
              {userProfile.avatar}
            </div>
            <div>
              <h2 className="font-semibold text-white">{userProfile.name}</h2>
              <p className="text-xs text-gray-400">@alexb_fan</p>
            </div>
          </div>

          {/* Center - Balances */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2">
              <Wallet className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">{userProfile.chzBalance} CHZ</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{userProfile.fanTokens} Tokens</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2">
              <Image className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">{userProfile.nfts} NFTs</span>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSendModal(true)}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 rounded-full px-4 py-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-96 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Send Money or Tokens</h3>
            
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setSendType('chz')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  sendType === 'chz' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                CHZ
              </button>
              <button
                onClick={() => setSendType('tokens')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  sendType === 'tokens' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                Fan Tokens
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient</label>
                <input
                  type="text"
                  placeholder="@username or wallet address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  placeholder={sendType === 'chz' ? 'CHZ amount' : 'Number of tokens'}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Add a message..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 h-20 resize-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSendModal(false)}
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default NavBar;
