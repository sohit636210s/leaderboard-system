// models/Claim.js

const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  claimedPoints: {
    type: Number,
    required: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Claim', claimSchema);
