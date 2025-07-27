const Booking = require('../models/Booking');
const Worker = require('../models/Worker');

exports.createBooking = async (req, res) => {
  const { customerName, address, city, pincode, contact, jobDescription } = req.body;

  const availableWorker = await Worker.findOne({ pincode, isAvailable: true });

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

  return res.status(200).json({
    message: 'Booking submitted',
    matchedWorker: availableWorker || 'No worker available nearby',
  });
};

// 👇 Yeh function bahar hona chahiye
exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('matchedWorker');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};