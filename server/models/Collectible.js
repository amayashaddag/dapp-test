const mongoose = require('mongoose');

const CollectibleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  imageUrl: String,
  tier: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
  claimedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

module.exports = mongoose.model('Collectible', CollectibleSchema);
