// // const mongoose = require('mongoose');

// // const users = [
// //   {
// //     username: "psg_fan01",
// //     displayName: "PSG Supporter",
// //     avatar: "🔵🔴",
// //     email: "psgfan01@example.com",
// //     walletAddress: "0x123abc456def789ghi",
// //     balances: {
// //       chz: 120.5,
// //       fanTokens: 50,
// //       nfts: 3,
// //     },
// //     profile: {
// //       bio: "Die-hard PSG fan and crypto enthusiast.",
// //       location: "Paris, France",
// //       joinDate: new Date("2023-01-15"),
// //       verified: true,
// //       followers: 1500,
// //       following: 180,
// //     },
// //     settings: {
// //       notifications: true,
// //       privacy: "public",
// //       theme: "dark",
// //     },
// //     createdAt: new Date("2023-01-15T08:00:00Z"),
// //     updatedAt: new Date("2023-07-01T12:30:00Z"),
// //   },
// //   {
// //     username: "ol_lyon_fan",
// //     displayName: "Lyon Ultra",
// //     avatar: "🔵⚪🔴",
// //     email: "lyonultra@example.com",
// //     walletAddress: "0xabc987def654ghi321",
// //     balances: {
// //       chz: 75.0,
// //       fanTokens: 30,
// //       nfts: 1,
// //     },
// //     profile: {
// //       bio: "Supporting Olympique Lyonnais since 1998.",
// //       location: "Lyon, France",
// //       joinDate: new Date("2022-11-10"),
// //       verified: false,
// //       followers: 540,
// //       following: 300,
// //     },
// //     settings: {
// //       notifications: false,
// //       privacy: "friends",
// //       theme: "light",
// //     },
// //     createdAt: new Date("2022-11-10T09:15:00Z"),
// //     updatedAt: new Date("2023-06-25T16:45:00Z"),
// //   },
// //   {
// //     username: "nft_collector_88",
// //     displayName: "CryptoNFT88",
// //     avatar: "🏆",
// //     email: "nftcollector88@example.com",
// //     walletAddress: "0xdef123456abc789ghi",
// //     balances: {
// //       chz: 200,
// //       fanTokens: 5,
// //       nfts: 20,
// //     },
// //     profile: {
// //       bio: "Collector of rare and legendary NFTs.",
// //       location: "Berlin, Germany",
// //       joinDate: new Date("2021-07-05"),
// //       verified: true,
// //       followers: 2300,
// //       following: 220,
// //     },
// //     settings: {
// //       notifications: true,
// //       privacy: "public",
// //       theme: "dark",
// //     },
// //     createdAt: new Date("2021-07-05T11:20:00Z"),
// //     updatedAt: new Date("2023-07-10T10:00:00Z"),
// //   },
// // ];

// // const userSchema = new mongoose.Schema({
// //   username: { type: String, unique: true, required: true },
// //   displayName: String,
// //   avatar: String,
// //   email: { type: String, unique: true, required: true },
// //   walletAddress: { type: String, unique: true },
// //   balances: {
// //     chz: Number,
// //     fanTokens: Number,
// //     nfts: Number,
// //   },
// //   profile: {
// //     bio: String,
// //     location: String,
// //     joinDate: Date,
// //     verified: Boolean,
// //     followers: Number,
// //     following: Number,
// //   },
// //   settings: {
// //     notifications: Boolean,
// //     privacy: { type: String, enum: ['public', 'private', 'friends'] },
// //     theme: { type: String, enum: ['dark', 'light'] },
// //   },
// //   createdAt: { type: Date, default: Date.now },
// //   updatedAt: { type: Date, default: Date.now },
// // });

// // const User = mongoose.model('User', userSchema);

// // async function seed() {
// //   try {
// //     await mongoose.connect('mongodb+srv://baggabom:zebbi@cluster0.et0q10d.mongodb.net/', {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log('Connected to MongoDB');

// //     // Optional: Clear existing users before inserting
// //     await User.deleteMany({});
// //     console.log('Cleared existing users');

// //     const result = await User.insertMany(users);
// //     console.log(`Inserted ${result.length} users`);

// //     await mongoose.disconnect();
// //     console.log('Disconnected from MongoDB');
// //   } catch (error) {
// //     console.error('Error seeding users:', error);
// //   }
// // }

// // seed();

// const mongoose = require('mongoose');

// // Define the schema
// const liveStreamSchema = new mongoose.Schema({
//   creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   title: String,
//   description: String,
//   thumbnail: String,
//   streamUrl: String,
//   status: { type: String, enum: ['live', 'scheduled', 'ended'] },
//   viewerCount: Number,
//   maxViewers: Number,
//   entryPrice: {
//     amount: Number,
//     currency: { type: String, enum: ['fanTokens', 'chz'] },
//   },
//   category: String,
//   tags: [String],
//   chat: {
//     enabled: Boolean,
//     messages: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         username: String,
//         message: String,
//         timestamp: Date,
//       },
//     ],
//   },
//   scheduledAt: Date,
//   startedAt: Date,
//   endedAt: Date,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const LiveStream = mongoose.model('LiveStream', liveStreamSchema);

// // ⚠️ Replace these with actual ObjectIds from your `User` collection
// const mockUserIds = {
//   psgInsider: '64fa1bcf9a12345678900001',
//   footballAnalytics: '64fa1bcf9a12345678900002',
//   olUltras: '64fa1bcf9a12345678900003',
// };

// const streams = [
//   {
//     creatorId: mockUserIds.psgInsider,
//     title: 'Match Analysis: PSG vs OM Preview',
//     description: 'Deep dive into tactics, lineups and match expectations.',
//     thumbnail: '🔵🔴',
//     streamUrl: 'https://example.com/stream/psg-om-preview',
//     status: 'live',
//     viewerCount: 1247,
//     maxViewers: 5000,
//     entryPrice: {
//       amount: 5,
//       currency: 'fanTokens',
//     },
//     category: 'Match Analysis',
//     tags: ['PSG', 'OM', 'Preview', 'Tactics'],
//     chat: {
//       enabled: true,
//       messages: [
//         {
//           userId: mockUserIds.footballAnalytics,
//           username: 'Football Analytics',
//           message: 'Can’t wait to see Mbappe play!',
//           timestamp: new Date(),
//         },
//       ],
//     },
//     startedAt: new Date(),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     creatorId: mockUserIds.footballAnalytics,
//     title: 'Transfer Market Updates',
//     description: 'Latest transfer rumors and confirmed deals.',
//     thumbnail: '⚽',
//     streamUrl: 'https://example.com/stream/transfer-updates',
//     status: 'live',
//     viewerCount: 832,
//     maxViewers: 3000,
//     entryPrice: {
//       amount: 3,
//       currency: 'fanTokens',
//     },
//     category: 'News',
//     tags: ['Transfers', 'Market', 'Breaking'],
//     chat: {
//       enabled: true,
//       messages: [],
//     },
//     startedAt: new Date(),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     creatorId: mockUserIds.olUltras,
//     title: 'Pre-Match Discussion',
//     description: 'Lyon fans talk about the upcoming weekend game.',
//     thumbnail: '🔵⚪🔴',
//     streamUrl: 'https://example.com/stream/lyon-discussion',
//     status: 'scheduled',
//     viewerCount: 0,
//     maxViewers: 2000,
//     entryPrice: {
//       amount: 2,
//       currency: 'fanTokens',
//     },
//     category: 'Community',
//     tags: ['Lyon', 'Fans', 'LiveChat'],
//     chat: {
//       enabled: false,
//       messages: [],
//     },
//     scheduledAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// async function seedLiveStreams() {
//   try {
//     await mongoose.connect('mongodb+srv://baggabom:zebbi@cluster0.et0q10d.mongodb.net/', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ Connected to MongoDB');

//     await LiveStream.deleteMany({});
//     console.log('🧹 Existing live streams cleared');

//     const result = await LiveStream.insertMany(streams);
//     console.log(`📺 Inserted ${result.length} live streams`);

//     await mongoose.disconnect();
//     console.log('🔌 Disconnected');
//   } catch (error) {
//     console.error('❌ Seeding error:', error);
//   }
// }

// seedLiveStreams();

// seedMarketplace.js
const mongoose = require('mongoose');

// ✅ Define the schema
const marketplaceItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['fanToken', 'nft', 'ticket', 'other'],
    required: true,
  },
  title: String,
  club: String,
  collection: String,
  logo: String,
  image: String,
  rarity: String,
  price: Number,
  currency: {
    type: String,
    enum: ['EUR', 'CHZ'],
  },
  seller: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
  },
  description: String,
  change: String,
  trendType: {
    type: String,
    enum: ['up', 'down'],
  },
  listedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Compile schema into model
const MarketplaceItem = mongoose.model('MarketplaceItem', marketplaceItemSchema);

// Replace with actual ObjectId of users in your DB
const sellerIds = {
  psg: '64fa1bcf9a12345678900001',
  nftGuy: '64fa1bcf9a12345678900002',
  ticketFan: '64fa1bcf9a12345678900003',
  randomUser: '64fa1bcf9a12345678900004',
};

const items = [
  {
    itemType: 'fanToken',
    club: 'OM',
    title: 'Olympique Marseille Token',
    image: '🔵⚪',
    price: 0.48,
    currency: 'EUR',
    seller: {
      userId: sellerIds.psg,
      username: '@om_fan_ultra',
    },
    description: 'Token with governance rights and matchday perks.',
  },
  {
    itemType: 'nft',
    title: 'Mbappe Golden Goal',
    collection: 'PSG Icons',
    image: '🏆',
    price: 3.0,
    currency: 'CHZ',
    rarity: 'Legendary',
    seller: {
      userId: sellerIds.nftGuy,
      username: '@nft_master',
    },
    description: 'A rare collectible moment from 2023 season.',
  },
  {
    itemType: 'ticket',
    club: 'OL',
    title: 'OL vs PSG - VIP Match Ticket',
    image: '🎫',
    price: 45.0,
    currency: 'EUR',
    seller: {
      userId: sellerIds.ticketFan,
      username: '@ol_supporter',
    },
    description: 'Access to VIP zone and exclusive lounge.',
  },
  {
    itemType: 'other',
    title: 'Signed Jersey - Neymar',
    image: '👕',
    price: 120.0,
    currency: 'EUR',
    seller: {
      userId: sellerIds.randomUser,
      username: '@collector_zone',
    },
    description: 'Official signed jersey with certificate of authenticity.',
  },
];

async function seedMarketplaceItems() {
  try {
    await mongoose.connect('mongodb+srv://baggabom:zebbi@cluster0.et0q10d.mongodb.net/', {
      // ✅ these options are now unnecessary and deprecated
    });
    console.log('✅ Connected to MongoDB');

    await MarketplaceItem.deleteMany({});
    console.log('🧹 Cleared previous marketplace items');

    const result = await MarketplaceItem.insertMany(items);
    console.log(`🛒 Inserted ${result.length} marketplace items`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error seeding marketplace items:', err);
  }
}

seedMarketplaceItems();