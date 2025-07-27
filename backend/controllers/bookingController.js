const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

exports.createBooking = async (req, res) => {
  try {
    const { customerName, address, city, pincode, contact, jobDescription } = req.body;

    // 👷 Try to find a nearby available worker
    const availableWorker = await Worker.findOne({ pincode, isAvailable: true });

    // 💾 Create new booking entry
    const booking = new Booking({
      customerName,
      address,
      city,
      pincode,
      contact,
      jobDescription,
      matchedWorker: availableWorker ? availableWorker._id : null,
    });

    await booking.save();

    // ✅ Respond to frontend
    return res.status(200).json({
      message: 'Booking submitted successfully.',
      bookingId: booking._id,
      matchedWorker: availableWorker || null
    });

  } catch (err) {
    console.error('❌ Booking save error:', err);
    return res.status(500).json({ error: 'Booking failed. Please try again.' });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('matchedWorker');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
