const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');

exports.requireAuth = async (req, res, next) => {
  try {
    // 🧪 Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const worker = await Worker.findById(decoded.workerId).select('-password');

    if (!worker) {
      return res.status(401).json({ error: 'Unauthorized: Worker not found' });
    }

    req.worker = worker; // 🧠 Attach user to request object
    next(); // ✅ Allow request to proceed
  } catch (error) {
    console.error('❌ JWT auth failed:', error.message);
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};
