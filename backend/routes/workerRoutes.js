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
  uploadWorkerPhoto,
  getWorkerProfile,
  toggleAvailability
} = require('../controllers/workerController');

// 🔒 Auth Middleware
const { requireAuth } = require('../middlewares/authMiddleware');

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = './uploads/workers';
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: (req, file, cb) => cb(null, 'worker_' + Date.now() + path.extname(file.originalname))
});
const photoUpload = multer({ storage: photoStorage });

/* -------------------------------------------------- */

// 🔐 Register Worker (Public)
router.post('/register', registerWorker);

// 🔑 Worker Login (Public)
router.post('/login', loginWorker);

// 📥 Worker Profile (Public — by ID)
router.get('/profile/:id', getWorkerProfile);

// 📝 Update Worker (Protected)
router.put('/update/:id', requireAuth, updateWorker);
router.put('/photo/:id', requireAuth, photoUpload.single('photo'), uploadWorkerPhoto);

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
