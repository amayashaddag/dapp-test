const mongoose = require('mongoose');

const NFTListingSchema = new mongoose.Schema({
  name: {
    type: String,         // e.g., "Mbappe Golden Moment"
    required: true
  },
  collection: {
    type: String          // e.g., "PSG Legends"
  },
  image: String,          // Emoji or image URL
  price: {
    type: Number,         // Price in CHZ
    required: true
  },
  rarity: {
    type: String,         // e.g., "Legendary", "Rare", "Common"
    enum: ['Legendary', 'Rare', 'Common']
  },
  seller: {
    type: String,         // Seller username or ObjectId ref
    required: true
  },
  listedAt: {
    type: Date,
    default: Date.now
  },
  description: String
});

module.exports = mongoose.model('NFTListing', NFTListingSchema);
