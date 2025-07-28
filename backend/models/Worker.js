const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  contact: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    match: /^[1-9][0-9]{5}$/
  },
  city: {
    type: String,
    trim: true // optional in new flow
  },
  skill: {
    type: String,
    required: true,
    enum: ['Carpenter', 'Electrician', 'Plumber', 'Painter', 'Other']
  },
  photo: {
    type: String // filename or image path
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// 🔐 Hash password before save
workerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Worker', workerSchema);
