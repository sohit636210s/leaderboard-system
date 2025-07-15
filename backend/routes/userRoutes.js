// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /addUser
// @desc    Add new user to leaderboard
router.post('/addUser', async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// @route   GET /users
// @desc    Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
