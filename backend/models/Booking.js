const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  pincode: String,
  city: String,
  contact: String,
  jobDescription: String,
  matchedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
});

module.exports = mongoose.model('Booking', bookingSchema);
