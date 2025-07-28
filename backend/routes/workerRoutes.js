const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// 📦 Controllers
const {
  registerWorker,
  loginWorker,
  updateWorker,
  getWorkerProfile,
  toggleAvailability
} = require('../controllers/workerController');

// 🔒 Auth Middleware
const { requireAuth } = require('../middlewares/authMiddleware');

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

/* -------------------------------------------------- */

// 🔐 Register Worker (Public)
router.post('/register', upload.single('photo'), registerWorker);

// 🔑 Worker Login (Public)
router.post('/login', loginWorker);

// 📥 Worker Profile (Public — by ID)
router.get('/profile/:id', getWorkerProfile);

// 📝 Update Worker (Protected)
router.put('/update/:id', requireAuth, updateWorker);

// 🎯 Toggle Availability (Protected)
router.put('/toggle-availability/:id', requireAuth, toggleAvailability);

// 📄 List Available Workers (Public)
router.get('/list', async (req, res) => {
  try {
    const workers = await require('../models/Worker').find({ isAvailable: true });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

/* -------------------------------------------------- */

module.exports = router;
