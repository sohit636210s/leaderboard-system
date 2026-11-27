const express = require('express');
const router = express.Router();
const { createBooking, listBookings, deleteBooking } = require('../controllers/bookingController');

// 🎯 POST /api/bookings/book - Customer books a service
router.post('/book', createBooking);

// 📋 GET /api/bookings/list - Admin views all bookings
router.get('/list', listBookings);

// 🗑️ DELETE /api/bookings/:id - Admin removes a booking from history
router.delete('/:id', deleteBooking);

module.exports = router;


