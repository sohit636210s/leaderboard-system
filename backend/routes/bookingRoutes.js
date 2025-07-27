const express = require('express');
const router = express.Router();
const { createBooking, listBookings } = require('../controllers/bookingController');

router.post('/book', createBooking);
router.get('/list', listBookings);

module.exports = router;