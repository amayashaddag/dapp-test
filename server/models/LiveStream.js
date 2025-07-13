const liveStreamSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  thumbnail: String,
  streamUrl: String,
  status: { type: String, enum: ['live', 'scheduled', 'ended'] },
  viewerCount: Number,
  maxViewers: Number,
  entryPrice: {
    amount: Number,
    currency: { type: String, enum: ['fanTokens', 'chz'] },
  },
  category: String,
  tags: [String],
  chat: {
    enabled: Boolean,
    messages: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String,
        message: String,
        timestamp: Date,
      }
    ]
  },
  scheduledAt: Date,
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);