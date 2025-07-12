import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Trophy, Calendar, Users, TrendingUp, Eye, EyeOff } from 'lucide-react';

const FanTokenHistoryMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showConnectionLines, setShowConnectionLines] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [totalStats, setTotalStats] = useState({
    totalTokens: 0,
    totalMatches: 0,
    countries: 0,
    totalSpent: 0
  });

  // Sample user data - replace with your actual data
  const userTicketHistory = [
    {
      id: 1,
      venue: "Parc des Princes",
      city: "Paris",
      country: "France",
      coordinates: { lat: 48.8414, lng: 2.2530 },
      match: "PSG vs Marseille",
      date: "2025-07-20",
      category: "VIP",
      fanTokensEarned: 25,
      chzSpent: 150,
      nftReceived: "PSG Derby NFT",
      attendance: 47000
    },
    {
      id: 2,
      venue: "Etihad Stadium",
      city: "Manchester",
      country: "England",
      coordinates: { lat: 53.4831, lng: -2.2004 },
      match: "Manchester City vs Liverpool",
      date: "2025-07-15",
      category: "Premium",
      fanTokensEarned: 20,
      chzSpent: 120,
      nftReceived: "City Premier NFT",
      attendance: 55000
    },
    {
      id: 3,
      venue: "Camp Nou",
      city: "Barcelona",
      country: "Spain",
      coordinates: { lat: 41.3809, lng: 2.1228 },
      match: "Barcelona vs Real Madrid",
      date: "2025-06-10",
      category: "Standard",
      fanTokensEarned: 15,
      chzSpent: 80,
      nftReceived: "El Clasico NFT",
      attendance: 99000
    },
    {
      id: 4,
      venue: "Allianz Stadium",
      city: "Turin",
      country: "Italy",
      coordinates: { lat: 45.1097, lng: 7.6411 },
      match: "Juventus vs Inter Milan",
      date: "2025-05-28",
      category: "VIP",
      fanTokensEarned: 22,
      chzSpent: 140,
      nftReceived: "Derby d'Italia NFT",
      attendance: 41000
    },
    {
      id: 5,
      venue: "Santiago Bernabéu",
      city: "Madrid",
      country: "Spain",
      coordinates: { lat: 40.4530, lng: -3.6883 },
      match: "Real Madrid vs Barcelona",
      date: "2025-04-15",
      category: "Premium",
      fanTokensEarned: 18,
      chzSpent: 110,
      nftReceived: "El Clasico NFT",
      attendance: 81000
    }
  ];

  useEffect(() => {
    // Calculate total stats
    const stats = userTicketHistory.reduce((acc, ticket) => {
      acc.totalTokens += ticket.fanTokensEarned;
      acc.totalMatches += 1;
      acc.totalSpent += ticket.chzSpent;
      return acc;
    }, { totalTokens: 0, totalMatches: 0, totalSpent: 0 });
    
    stats.countries = [...new Set(userTicketHistory.map(t => t.country))].length;
    setTotalStats(stats);
  }, []);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const mapOptions = {
        zoom: 4,
        center: { lat: 48.8566, lng: 2.3522 }, // Paris as center
        styles:[
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8ec3b9"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1a3646"
                }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#64779e"
                }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#334e87"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#6f9ba5"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#3C7680"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#304a7d"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#2c6675"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#255763"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#b0d5ce"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#3a4762"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#0e1626"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#4e6d70"
                }
                ]
            }
            ], 
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
      };

      const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(googleMap);

      // Create SVG icons for different categories
      const createMarkerIcon = (category) => {
        const colors = {
          'VIP': '#f59e0b',
          'Premium': '#ec4899',
          'Standard': '#6366f1'
        };
        const icons = {
          'VIP': '👑',
          'Premium': '⭐',
          'Standard': '🎫'
        };
        
        const color = colors[category] || '#6b7280';
        const icon = icons[category] || '📍';
        
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          labelOrigin: new window.google.maps.Point(0, 0)
        };
      };

      // Create markers for each location
      const mapMarkers = userTicketHistory.map((ticket, index) => {
        const marker = new window.google.maps.Marker({
          position: ticket.coordinates,
          map: googleMap,
          title: `${ticket.venue} - ${ticket.city}`,
          icon: createMarkerIcon(ticket.category),
          label: {
            text: getCategoryIcon(ticket.category),
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff'
          }
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937;">${ticket.venue}</h3>
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${ticket.city}, ${ticket.country}</p>
              <p style="margin: 0 0 8px 0; color: #374151; font-weight: 500;">${ticket.match}</p>
              <div style="display: flex; gap: 16px; font-size: 12px;">
                <span style="color: #059669;">🏆 ${ticket.fanTokensEarned} tokens</span>
                <span style="color: #dc2626;">💰 ${ticket.chzSpent} CHZ</span>
              </div>
            </div>
          `
        });

        // Add click listener
        marker.addListener('click', () => {
          // Close any open info windows
          if (window.currentInfoWindow) {
            window.currentInfoWindow.close();
          }
          
          // Open this info window
          infoWindow.open(googleMap, marker);
          window.currentInfoWindow = infoWindow;
          
          // Also set the selected location for the detail panel
          setSelectedLocation(ticket);
        });

        // Add hover effects
        marker.addListener('mouseover', () => {
          marker.setIcon({
            ...createMarkerIcon(ticket.category),
            scale: 24
          });
        });

        marker.addListener('mouseout', () => {
          marker.setIcon(createMarkerIcon(ticket.category));
        });

        return { marker, infoWindow, ticket };
      });

      setMarkers(mapMarkers);

      // Add connection lines between locations
      if (showConnectionLines && userTicketHistory.length > 1) {
        const path = userTicketHistory
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(ticket => ticket.coordinates);
        
        new window.google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#00ffff', // bright cyan
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: googleMap
        });
      }
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4_l5s12Brtf1FMAMOs7T1cP50QbXyKAc&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [showConnectionLines]);



  const getCategoryColor = (category) => {
    switch (category) {
      case 'VIP': return 'from-yellow-400 to-orange-500';
      case 'Premium': return 'from-purple-400 to-pink-500';
      case 'Standard': return 'from-blue-400 to-indigo-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'VIP': return '👑';
      case 'Premium': return '⭐';
      case 'Standard': return '🎫';
      default: return '📍';
    }
  };

  return (
    <div className="relative w-full h-screen">
         <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Votre Parcours Fan Token
                </h3>
                <p className="text-gray-400 text-sm">
                  Découvrez votre histoire de supporter à travers l'Europe
                </p>
              </div>
              
                <button
                    onClick={() => setShowConnectionLines(!showConnectionLines)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {showConnectionLines ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    Trajets
                </button>
            </div>
            {/* Stats Bar */}
            <div className="flex gap-4 mb-6 overflow-x-auto">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full whitespace-nowrap">
                <Trophy className="w-4 h-4" />
                <span className="font-semibold">720</span>
                <span className="text-sm opacity-90">Fan Tokens</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full whitespace-nowrap">
                <Users className="w-4 h-4" />
                <span className="font-semibold">24</span>
                <span className="text-sm opacity-90">Matchs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full whitespace-nowrap">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">5</span>
                <span className="text-sm opacity-90">Pays</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full whitespace-nowrap">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">1,247</span>
                <span className="text-sm opacity-90">CHZ</span>
              </div>
            </div>

      {/* Map Container */}
      <div className="absolute inset-0 pt-32">
        <div className="relative w-full h-full">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>

      {/* Location Detail Panel */}
      {selectedLocation && (
        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 z-50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedLocation.venue}
              </h3>
              <p className="text-gray-600">
                {selectedLocation.city}, {selectedLocation.country}
              </p>
            </div>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Détails du match</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Match:</span>
                  <span className="font-medium">{selectedLocation.match}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(selectedLocation.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Catégorie:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(selectedLocation.category)} text-white`}>
                    {selectedLocation.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Affluence:</span>
                  <span className="font-medium">{selectedLocation.attendance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Récompenses</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-900">+{selectedLocation.fanTokensEarned} Fan Tokens</p>
                    <p className="text-sm text-gray-600">Gagnés pour ce match</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs">
                    🎨
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedLocation.nftReceived}</p>
                    <p className="text-sm text-gray-600">NFT Collectible</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center text-white text-xs">
                    💰
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedLocation.chzSpent} CHZ</p>
                    <p className="text-sm text-gray-600">Coût du billet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanTokenHistoryMap;