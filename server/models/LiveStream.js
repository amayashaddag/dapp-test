const mongoose = require('mongoose');

const LiveStreamSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  streamUrl: String,
  isLive: { type: Boolean, default: false },

  fanTokenRequired: {
    symbol: String,
    minAmount: Number
  },

  startTime: Date,
  endTime: Date,
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('LiveStream', LiveStreamSchema);
