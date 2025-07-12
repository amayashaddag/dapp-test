const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  title: String,
  content: String,
  mediaUrl: String,

  fanTokenRequired: {
    symbol: String,   // e.g. $PSG
    minAmount: Number // e.g. 10 tokens to view this content
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tips: [{
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amountCHZ: Number,
    date: Date
  }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
