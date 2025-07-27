const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// 🧑‍💼 Customer Registration Route
router.post('/register', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json({ message: 'Customer registered successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Customer with this contact already exists.' });
    } else {
      res.status(500).json({
        error: 'Customer registration failed.',
        details: err.message
      });
    }
  }
});

// 📋 List All Customers (For login/verification)
router.get('/list', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch customer list.',
      details: err.message
    });
  }
});

module.exports = router;
