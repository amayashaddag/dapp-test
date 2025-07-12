import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, ChevronDown, ChevronUp, Ticket } from 'lucide-react';

const TicketsSection = () => {
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  // Sample tickets data - replace with your actual data
  const tickets = [
    {
      id: 1,
      matchTitle: "PSG vs Marseille",
      date: "2025-07-20T20:00:00Z",
      venue: "Parc des Princes",
      category: "VIP",
      price: "150 CHZ",
      fanTokensEarned: 25,
      nftReceived: {
        name: "PSG Derby NFT",
        rarity: "Rare",
        image: "/api/placeholder/60/60"
      },
      seat: "Section VIP A - Row 5 - Seat 12",
      status: "upcoming",
      teamColors: ["#004170", "#DA020E"]
    },
    {
      id: 2,
      matchTitle: "Manchester City vs Liverpool",
      date: "2025-07-15T19:30:00Z",
      venue: "Etihad Stadium",
      category: "Premium",
      price: "120 CHZ",
      fanTokensEarned: 20,
      nftReceived: {
        name: "City Premier NFT",
        rarity: "Common",
        image: "/api/placeholder/60/60"
      },
      seat: "Section 105 - Row 15 - Seat 8",
      status: "upcoming",
      teamColors: ["#6CABDD", "#1C2C5B"]
    },
    {
      id: 3,
      matchTitle: "Barcelona vs Real Madrid",
      date: "2025-06-10T21:00:00Z",
      venue: "Camp Nou",
      category: "Standard",
      price: "80 CHZ",
      fanTokensEarned: 15,
      nftReceived: {
        name: "El Clasico NFT",
        rarity: "Epic",
        image: "/api/placeholder/60/60"
      },
      seat: "Section 203 - Row 25 - Seat 14",
      status: "attended",
      teamColors: ["#A50044", "#004D98"]
    },
    {
      id: 4,
      matchTitle: "Juventus vs Inter Milan",
      date: "2025-05-28T18:00:00Z",
      venue: "Allianz Stadium",
      category: "VIP",
      price: "140 CHZ",
      fanTokensEarned: 22,
      nftReceived: {
        name: "Derby d'Italia NFT",
        rarity: "Legendary",
        image: "/api/placeholder/60/60"
      },
      seat: "Section VIP B - Row 3 - Seat 7",
      status: "attended",
      teamColors: ["#000000", "#0068A8"]
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'VIP': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'Premium': return 'bg-gradient-to-r from-purple-400 to-purple-600';
      case 'Standard': return 'bg-gradient-to-r from-blue-400 to-blue-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'text-orange-500';
      case 'Epic': return 'text-purple-500';
      case 'Rare': return 'text-blue-500';
      case 'Common': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return ticket.status === 'upcoming';
    if (filter === 'past') return ticket.status === 'attended';
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
        {[
          { key: 'all', label: 'Tous', count: tickets.length },
          { key: 'upcoming', label: 'À venir', count: tickets.filter(t => t.status === 'upcoming').length },
          { key: 'past', label: 'Passés', count: tickets.filter(t => t.status === 'attended').length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(ticket.category)}`}>
                      {ticket.category}
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                      ticket.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status === 'upcoming' ? 'À venir' : 'Assisté'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{ticket.matchTitle}</h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(ticket.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(ticket.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{ticket.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{ticket.price}</div>
                    <div className="text-sm text-gray-500">Prix payé</div>
                  </div>
                  
                  <button
                    onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="text-sm">Détails</span>
                    {expandedTicket === ticket.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Rewards Preview */}
              <div className="flex items-center justify-between mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-900">+{ticket.fanTokensEarned} Fan Tokens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900">NFT Reçu</span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedTicket === ticket.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Informations du siège</h4>
                      <p className="text-gray-600">{ticket.seat}</p>
                      
                      <h4 className="font-semibold text-gray-900 mt-4 mb-2">Récompenses gagnées</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700">{ticket.fanTokensEarned} Fan Tokens</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">NFT Collectible</h4>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                          <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{ticket.nftReceived.name}</p>
                          <p className={`text-sm font-medium ${getRarityColor(ticket.nftReceived.rarity)}`}>
                            {ticket.nftReceived.rarity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {ticket.status === 'upcoming' && (
                    <div className="mt-4 flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Voir le billet
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Ajouter au calendrier
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun billet trouvé</h3>
          <p className="text-gray-600">
            {filter === 'all' ? 'Vous n\'avez pas encore acheté de billets.' : 
             filter === 'upcoming' ? 'Aucun match à venir.' : 
             'Aucun match passé.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketsSection;