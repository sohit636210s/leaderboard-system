const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 Setup multer for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/workers';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'worker_' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Register Worker with validation & error response
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, password, contact, address, pincode, skill } = req.body;

    // 🔍 Basic field check
    if (!name || !email || !password || !contact || !address || !pincode || !skill) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🧾 Check for existing worker
    const existing = await Worker.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const worker = new Worker({
      name,
      email,
      password,
      contact,
      address,
      pincode,
      skill,
      photo: req.file ? req.file.filename : null
    });

    await worker.save();
    res.status(201).json({ message: '✅ Worker registered successfully', worker });
  } catch (err) {
    console.error('❌ Worker registration error:', err.message);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// 📄 List available workers
router.get('/list', async (req, res) => {
  try {
    const workers = await Worker.find({ isAvailable: true });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

module.exports = router;
