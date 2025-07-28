const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

// ✅ Create Booking + Match Worker
const createBooking = async (req, res) => {
  try {
    const { customerName, address, city, pincode, contact, jobDescription } = req.body;

    // 1️⃣ Save Booking
    const newBooking = new Booking({
      customerName,
      address,
      city,
      pincode,
      contact,
      jobDescription
    });
    await newBooking.save();

    // 2️⃣ Find Worker by Pincode
    const matchedWorker = await Worker.findOne({ pincode });

    // 3️⃣ Save Worker reference if matched
    if (matchedWorker) {
      newBooking.matchedWorker = matchedWorker._id;
      await newBooking.save();
    }

    // 4️⃣ Populate for full detail in response
    await newBooking.populate('matchedWorker');

    res.status(201).json({
      message: 'Booking saved successfully',
      matchedWorker: matchedWorker ? newBooking.matchedWorker : null
    });

  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ error: 'Booking failed' });
  }
};

// 🗂 List All Bookings (for Admin Dashboard)
const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('matchedWorker');
    res.json(bookings);
  } catch (err) {
    console.error('List error:', err.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

module.exports = { createBooking, listBookings };
