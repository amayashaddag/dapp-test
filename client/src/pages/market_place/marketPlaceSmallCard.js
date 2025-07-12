import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FanTokenCard = ({ item }) => {
  const {
    id,
    logoImage,  // optional URL
    logo,       // fallback emoji/logo
    title,      // optional token name/title
    club,
    price,
    change,
    type,       // 'up' | 'down'
    seller
  } = item;

  return (
    <div
      key={id}
      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-colors shadow-md"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg font-medium text-white">
            {logoImage ? (
              <img src={logoImage} alt={club} className="w-full h-full object-cover" />
            ) : (
              logo
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{club}</p>
            {title && <p className="text-xs text-gray-400">{title}</p>}
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-1 mb-4">
        <p className="text-lg font-bold text-white">€{price}</p>
        <p
          className={`text-sm flex items-center ${
            type === 'up' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {type === 'up' ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {change}
        </p>
      </div>

      {/* Seller Section */}
      <div className="text-xs text-gray-400">
        <span>Seller: </span>
        <span className="font-medium text-purple-400">{seller}</span>
      </div>
    </div>
  );
};

export default FanTokenCard;
