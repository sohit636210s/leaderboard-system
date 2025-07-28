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

// 🔒 Middleware (Optional if protected route needed)
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

// 🔐 Register Worker
router.post('/register', upload.single('photo'), registerWorker);

// 🔑 Worker Login
router.post('/login', loginWorker);

// 📥 Worker Profile
router.get('/profile/:id', getWorkerProfile);

// 📝 Update Worker
router.put('/update/:id', updateWorker);

// 🎯 Toggle Availability
router.put('/toggle-availability/:id', toggleAvailability);

// 📄 List Available Workers
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
