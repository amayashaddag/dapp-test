const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profilePicture: String,
  bio: String,

  fanTokensOwned: [{
    symbol: String,   // $PSG, $OM, etc.
    amount: Number
  }],

  fanPoints: { type: Number, default: 0 },

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  roles: [String], // ["creator", "fan", "admin"]
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
