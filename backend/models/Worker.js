const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Invalid Indian mobile number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^[1-9][0-9]{5}$/, 'Invalid 6-digit pincode']
  },
  city: {
    type: String,
    trim: true, // optional in new flow
    default: ''
  },
  skill: {
    type: String,
    required: [true, 'Skill is required'],
    enum: {
      values: ['Carpenter', 'Electrician', 'Plumber', 'Painter', 'Other'],
      message: 'Invalid skill type'
    }
  },
  photo: {
    type: String,
    default: 'default.jpg' // fallback if multer fails
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// 🔐 Password hashing pre-save
workerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Worker', workerSchema);
