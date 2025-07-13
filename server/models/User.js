const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  displayName: String,
  avatar: String,
  email: { type: String, unique: true, required: true },
  walletAddress: { type: String, unique: true },
  balances: {
    chz: Number,
    fanTokens: Number,
    nfts: Number,
  },
  profile: {
    bio: String,
    location: String,
    joinDate: Date,
    verified: Boolean,
    followers: Number,
    following: Number,
  },
  settings: {
    notifications: Boolean,
    privacy: { type: String, enum: ['public', 'private', 'friends'] },
    theme: { type: String, enum: ['dark', 'light'] },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);