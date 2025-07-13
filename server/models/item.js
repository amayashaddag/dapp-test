const MarketplaceItem = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['fanToken', 'nft', 'ticket', 'other'],
    required: true
  },
  title: String,             // NFT name or Token title
  club: String,              // For tokens
  collection: String,        // For NFTs
  logo: String,              // Emoji
  image: String,             // NFT image URL
  rarity: String,            // Only for NFTs
  price: Number,             // In EUR or CHZ
  currency: {
    type: String,
    enum: ['EUR', 'CHZ']
  },
  seller: String,            // username or ObjectId
  description: String,
  change: String,            // For tokens
  trendType: {
    type: String,
    enum: ['up', 'down']
  },
  listedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MarketplaceItem', MarketplaceItem);