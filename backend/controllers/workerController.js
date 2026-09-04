const Worker = require('../models/Worker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📝 Register new worker
exports.registerWorker = async (req, res) => {
  try {
    console.log('⏳ Incoming register request...');
    console.log('📦 Body:', req.body);
    console.log('🖼️ File:', req.file);

    const { name, email, password, contact, address, pincode, skill } = req.body;

    if (!name || !email || !password || !contact || !address || !pincode || !skill) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingEmail = await Worker.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ error: 'This email is already registered. Please use another email or log in.' });
    }

    const existingContact = await Worker.findOne({ contact: contact.trim() });
    if (existingContact) {
      return res.status(409).json({ error: 'This phone number is already registered. Please use another number or log in.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Safe photo handling
    let photoFile = null;
    if (req.file && req.file.filename) {
      photoFile = req.file.filename;
    } else {
      console.warn('⚠️ Photo upload missing or multer failed');
      photoFile = 'default.jpg'; // fallback image
    }

    const worker = new Worker({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      contact: contact.trim(),
      address,
      pincode,
      skill,
      photo: photoFile
    });

    await worker.save();
    console.log('✅ Worker saved:', worker._id);

    res.status(201).json({ message: 'Worker registered successfully', worker });
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// 🔑 Login worker
exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);

    const worker = await Worker.findOne({ email });
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not set in env');
    }

    const token = jwt.sign({ workerId: worker._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.json({ message: 'Login successful', token, worker });
  } catch (error) {
    console.error('❌ Login error:', error.message);
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
    console.error('❌ Fetching profile failed:', error.message);
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
    console.error('❌ Update failed:', error.message);
    res.status(400).json({ error: 'Update failed', details: error.message });
  }
};

// Upload worker profile photo after signup
exports.uploadWorkerPhoto = async (req, res) => {
  try {
    if (!req.file?.filename) {
      return res.status(400).json({ error: 'Please select a profile photo' });
    }

    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      { photo: req.file.filename },
      { new: true }
    ).select('-password');

    if (!updated) return res.status(404).json({ error: 'Worker not found' });
    res.json({ message: 'Profile photo uploaded successfully', worker: updated });
  } catch (error) {
    console.error('❌ Photo upload failed:', error.message);
    res.status(500).json({ error: 'Photo upload failed', details: error.message });
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
    console.error('❌ Toggle failed:', error.message);
    res.status(500).json({ error: 'Toggle failed', details: error.message });
  }
};
