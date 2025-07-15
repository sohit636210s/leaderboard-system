const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Claim = require('../models/Claim');

// @route   POST /claimPoints
// @desc    Randomly assign points to selected user
router.post('/claimPoints', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate request
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const points = Math.floor(Math.random() * 10) + 1; // Random points between 1–10

    // Find user and update total points
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.totalPoints += points;
    await user.save();

    // Save claim history
    const claim = new Claim({
      user: user._id,
      claimedPoints: points,
      claimedAt: Date.now(),
    });
    await claim.save();

    res.status(200).json({ message: 'Points claimed', points, user });
  } catch (error) {
    console.error('Error in claimPoints:', error);
    res.status(500).json({ error: 'Claim failed' });
  }
});

// @route   GET /leaderboard
// @desc    Fetch users ranked by points descending
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error in leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// @route   GET /claims
// @desc    Fetch recent claim history with user info
router.get('/claims', async (req, res) => {
  try {
    const history = await Claim.find()
      .sort({ claimedAt: -1 })
      .limit(10)
      .populate('user'); // Brings in user name

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching claim history:', error);
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

module.exports = router;
