const Worker = require('../models/Worker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📝 Register new worker
exports.registerWorker = async (req, res) => {
  try {
    const { name, email, password, contact, address, pincode, skill } = req.body;

    if (!name || !email || !password || !contact || !address || !pincode || !skill) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await Worker.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const photoFile = req.file ? req.file.filename : null;

    const worker = new Worker({
      name,
      email,
      password: hashedPassword,
      contact,
      address,
      pincode,
      skill,
      photo: photoFile
    });

    await worker.save();
    res.status(201).json({ message: 'Worker registered successfully', worker });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// 🔑 Login worker
exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ workerId: worker._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.json({ message: 'Login successful', token, worker });
  } catch (error) {
    res.status(500).json({ error: 'Login error', details: error.message });
  }
};

// 📥 Get profile
exports.getWorkerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).select('-password');
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile', details: error.message });
  }
};

// 📝 Update worker profile
exports.updateWorker = async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json({ message: 'Worker updated successfully', updated });
  } catch (error) {
    res.status(400).json({ error: 'Update failed', details: error.message });
  }
};

// 🎯 Toggle availability
exports.toggleAvailability = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    worker.isAvailable = !worker.isAvailable;
    await worker.save();

    res.json({ message: `Availability set to ${worker.isAvailable}`, isAvailable: worker.isAvailable });
  } catch (error) {
    res.status(500).json({ error: 'Toggle failed', details: error.message });
  }
};
