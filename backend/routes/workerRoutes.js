const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

router.post('/register', async (req, res) => {
  const worker = new Worker(req.body);
  await worker.save();
  res.status(201).json({ message: 'Worker registered' });
});

router.get('/list', async (req, res) => {
  const workers = await Worker.find({ isAvailable: true });
  res.json(workers);
});

module.exports = router;
