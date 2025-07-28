const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

// ✅ Create Booking + Match Worker by pincode
const createBooking = async (req, res) => {
  try {
    const { customerName, address, pincode, contact, jobDescription } = req.body;

    // 1️⃣ Create & save the booking
    const newBooking = new Booking({
      customerName,
      address,
      pincode,
      contact,
      jobDescription
    });
    await newBooking.save();

    // 2️⃣ Match a worker by pincode
    const matchedWorker = await Worker.findOne({ pincode });

    // 3️⃣ Assign worker if found
    if (matchedWorker) {
      newBooking.matchedWorker = matchedWorker._id;
      await newBooking.save();
    }

    // 4️⃣ Populate for full matchedWorker details
    await newBooking.populate('matchedWorker');

    // 5️⃣ Return simplified response
    res.status(201).json({
      message: '✅ Booking saved successfully',
      matchedWorker: matchedWorker
        ? {
            name: matchedWorker.name,
            contact: matchedWorker.contact,
            city: matchedWorker.city,
            pincode: matchedWorker.pincode
          }
        : null
    });
  } catch (error) {
    console.error('❌ Booking error:', error.message);
    res.status(500).json({ error: 'Booking failed. Please try again.' });
  }
};

// 🗂 Admin: List all bookings with worker details
const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('matchedWorker');
    res.json(bookings);
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

module.exports = { createBooking, listBookings };
