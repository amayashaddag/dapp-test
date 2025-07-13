const mongoose = require('mongoose');

const fanTokenSchema = new mongoose.Schema({
  symbol: String,       // e.g., PSG, BAR, etc.
  quantity: Number,
  valueEUR: Number      // total value in EUR
}, { _id: false });

const nftSchema = new mongoose.Schema({
  tokenId: String,
  collection: String,
  name: String,
  rarity: String,
  valueCHZ: Number
}, { _id: false });

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['deposit', 'withdrawal', 'purchase', 'reward'] },
  asset: String,           // 'CHZ', 'fanToken', 'NFT'
  details: String,
  amount: Number,
  currency: { type: String, enum: ['CHZ', 'EUR'] },
  date: { type: Date, default: Date.now }
}, { _id: false });

const userBankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  balances: {
    chz: Number,
    eur: Number,
  },

  fanTokens: [fanTokenSchema],

  nfts: [nftSchema],

  rewards: {
    staking: Number,
    cashback: Number,
    referralBonus: Number
  },

  transactions: [transactionSchema],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserBank', userBankSchema);
