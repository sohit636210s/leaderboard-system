const express = require('express');
const router = express.Router();
const { createBooking, listBookings } = require('../controllers/bookingController');

// 🎯 POST /api/bookings/book - Customer books a service
router.post('/book', createBooking);

// 📋 GET /api/bookings/list - Admin views all bookings
router.get('/list', listBookings);

module.exports = router;


