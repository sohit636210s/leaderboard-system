const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

// ✅ Create Booking + Match Worker by pincode
const createBooking = async (req, res) => {
  try {
    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database is not connected. Please try again in a moment.' });
    }

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

    // 2️⃣ Find every available carpenter serving the customer's pincode
    const availableWorkers = await Worker.find({ pincode, isAvailable: true, skill: 'Carpenter' });
    const matchedWorker = availableWorkers[0] || null;

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
        _id: matchedWorker._id,
            name: matchedWorker.name,
            contact: matchedWorker.contact,
            city: matchedWorker.city,
            pincode: matchedWorker.pincode
          }
        : null,
      availableWorkers: availableWorkers.map(worker => ({
        _id: worker._id,
        name: worker.name,
        contact: worker.contact,
        city: worker.city,
        pincode: worker.pincode,
        verified: worker.verified
      }))
    });
  } catch (error) {
    console.error('❌ Booking error:', error.message);
    res.status(500).json({ error: 'Booking could not be saved. Please try again.' });
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
