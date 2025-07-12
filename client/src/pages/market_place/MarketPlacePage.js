import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  Plus, 
  Grid, 
  List, 
  Star, 
  Eye, 
  ShoppingCart, 
  Tag, 
  User, 
  Clock, 
  Image as ImageIcon, 
  Trophy,
  X,
  Upload,
  Wallet
} from 'lucide-react';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('tokens'); // 'tokens' or 'nfts'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellType, setSellType] = useState('tokens'); // 'tokens' or 'nfts'
  const [sortBy, setSortBy] = useState('price'); // 'price', 'change', 'time'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for fan tokens
  const fanTokens = [
    {
      id: 1,
      logoImage: null,
      logo: '🔵🔴',
      title: 'Paris Saint-Germain Token',
      club: 'PSG',
      price: '0.52',
      change: '+2.5%',
      type: 'up',
      seller: '@psg_collector'
    },
    {
      id: 2,
      logoImage: null,
      logo: '🔵⚪',
      title: 'Olympique Marseille Token',
      club: 'OM',
      price: '0.48',
      change: '-1.2%',
      type: 'down',
      seller: '@om_fan_ultra'
    },
    {
      id: 3,
      logoImage: null,
      logo: '🔵⚪🔴',
      title: 'Olympique Lyonnais Token',
      club: 'OL',
      price: '0.45',
      change: '+3.1%',
      type: 'up',
      seller: '@lyon_insider'
    },
    {
      id: 4,
      logoImage: null,
      logo: '🟢',
      title: 'AS Saint-Étienne Token',
      club: 'ASSE',
      price: '0.42',
      change: '+0.8%',
      type: 'up',
      seller: '@verts_supporter'
    },
    {
      id: 5,
      logoImage: null,
      logo: '🟡🟢',
      title: 'FC Nantes Token',
      club: 'FCN',
      price: '0.38',
      change: '+1.5%',
      type: 'up',
      seller: '@canaris_fan'
    },
    {
      id: 6,
      logoImage: null,
      logo: '🔴⚪',
      title: 'LOSC Lille Token',
      club: 'LOSC',
      price: '0.55',
      change: '-0.5%',
      type: 'down',
      seller: '@lille_mastiff'
    }
  ];

  // Mock NFT data
  const nftItems = [
    {
      id: 1,
      name: 'Mbappe Golden Moment',
      collection: 'PSG Legends',
      price: '2.5',
      image: '🏆',
      seller: '@nft_collector',
      rarity: 'Legendary'
    },
    {
      id: 2,
      name: 'Payet Free Kick',
      collection: 'OM Memories',
      price: '1.8',
      image: '⚽',
      seller: '@marseille_nft',
      rarity: 'Rare'
    },
    {
      id: 3,
      name: 'Stadium Night View',
      collection: 'Venue Collection',
      price: '0.9',
      image: '🏟️',
      seller: '@stadium_photos',
      rarity: 'Common'
    }
  ];

  const filteredTokens = fanTokens.filter(token => 
    token.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNFTs = nftItems.filter(nft => 
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TokenCard = ({ token, isGrid = true }) => (
    <div className={`bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 ${isGrid ? 'p-4' : 'p-3'}`}>
      {isGrid ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg">
                {token.logoImage ? (
                  <img src={token.logoImage} alt={token.club} className="w-full h-full rounded-full" />
                ) : (
                  token.logo
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{token.club}</h3>
                {token.title && <p className="text-xs text-gray-400">{token.title}</p>}
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Star className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">€{token.price}</span>
              <div className={`flex items-center space-x-1 ${token.type === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {token.type === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{token.change}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>{token.seller}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-lg py-2 px-4 font-medium transition-colors">
              Buy Now
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              {token.logoImage ? (
                <img src={token.logoImage} alt={token.club} className="w-full h-full rounded-full" />
              ) : (
                token.logo
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{token.club}</h3>
              <p className="text-sm text-gray-400">{token.seller}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-bold text-white">€{token.price}</span>
            <div className={`flex items-center space-x-1 ${token.type === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {token.type === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{token.change}</span>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 rounded-lg py-2 px-4 font-medium transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const NFTCard = ({ nft }) => (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-6xl">
        {nft.image}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-white">{nft.name}</h3>
          <p className="text-sm text-gray-400">{nft.collection}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{nft.price} CHZ</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            nft.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400' :
            nft.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {nft.rarity}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <User className="w-4 h-4" />
          <span>{nft.seller}</span>
        </div>
        
        <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-2 px-4 font-medium transition-colors">
          Buy NFT
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Marketplace
              </h1>
              <p className="text-gray-400">Buy and sell fan tokens & NFTs</p>
            </div>
            
            <button
              onClick={() => setShowSellModal(true)}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 rounded-xl px-6 py-3 font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Sell Item</span>
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('tokens')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'tokens' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Fan Tokens</span>
              </button>
              <button
                onClick={() => setActiveTab('nfts')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'nfts' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>NFTs</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 w-64"
                />
              </div>
              
              {/* View Mode */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="price">Price</option>
                <option value="change">Change</option>
                <option value="time">Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'tokens' ? (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {filteredTokens.map((token) => (
              <TokenCard key={token.id} token={token} isGrid={viewMode === 'grid'} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>

      {/* Sell Modal */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sell Item</h3>
              <button
                onClick={() => setShowSellModal(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setSellType('tokens')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  sellType === 'tokens' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                Fan Tokens
              </button>
              <button
                onClick={() => setSellType('nfts')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  sellType === 'nfts' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                NFTs
              </button>
            </div>
            
            <div className="space-y-4">
              {sellType === 'tokens' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Club</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
                      <option value="">Choose a club</option>
                      <option value="PSG">Paris Saint-Germain</option>
                      <option value="OM">Olympique Marseille</option>
                      <option value="OL">Olympique Lyonnais</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Tokens</label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">NFT Image</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">Upload NFT image</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">NFT Name</label>
                    <input
                      type="text"
                      placeholder="Enter NFT name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Collection</label>
                    <input
                      type="text"
                      placeholder="Enter collection name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 pr-16 focus:outline-none focus:border-purple-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {sellType === 'tokens' ? 'EUR' : 'CHZ'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Describe your item..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 h-20 resize-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSellModal(false)}
                className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
                List Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;