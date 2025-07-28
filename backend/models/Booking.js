const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  contact: { type: String, required: true },
  jobDescription: { type: String, required: true },
  matchedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
