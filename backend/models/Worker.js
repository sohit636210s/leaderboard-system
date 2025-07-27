const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  skill: {
    type: String,
    required: true,
    enum: ['Carpenter', 'Electrician', 'Plumber', 'Painter', 'Other']
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    match: /^[1-9][0-9]{5}$/
  },
  contact: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', workerSchema);
