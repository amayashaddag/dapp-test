const mongoose = require('mongoose');

const FanTokenListingSchema = new mongoose.Schema({
  club: {
    type: String,         // e.g., "PSG", "OM"
    required: true
  },
  title: {
    type: String          // Full name, e.g., "Paris Saint-Germain Token"
  },
  logo: String,           // Emoji or image URL
  logoImage: String,      // Optional: uploaded image path
  price: {
    type: Number,         // Price in EUR
    required: true
  },
  change: String,         // e.g., "+2.5%"
  type: {
    type: String,         // 'up' | 'down'
    enum: ['up', 'down']
  },
  seller: {
    type: String,         // Seller username, or ObjectId ref to User
    required: true
  },
  listedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FanTokenListing', FanTokenListingSchema);
