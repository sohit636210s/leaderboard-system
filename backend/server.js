// 🛠️ Express aur Mongoose import karna
const express = require('express');
const mongoose = require('mongoose');

// 📦 dotenv ke through env file load karna
const dotenv = require('dotenv');
dotenv.config();

// 🔓 CORS enable karna (👇 This solves your deployment issue!)
const cors = require('cors');
const path = require('path');

// 🚀 Express app initialize karna
const app = express();

// 🔓 Cross-Origin requests ko allow karna (Netlify → Render)
app.use(cors());

// 📨 JSON request body ko parse karna
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🛣️ Routes connect karna (Booking, Worker, Customer APIs)
const bookingRoutes = require('./routes/bookingRoutes');
const workerRoutes = require('./routes/workerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./features/products/productRoutes');

app.use('/api/bookings', bookingRoutes);      // 🔨 Booking APIs
app.use('/api/workers', workerRoutes);        // 👷 Worker APIs
app.use('/api/customers', customerRoutes);    // 🧑‍💼 Customer APIs
app.use('/api/products', productRoutes);      // 🛍️ Shopping catalog APIs

// 🚪 Root route — for browser or Render base URL test
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'degraded',
    database: databaseConnected ? 'connected' : 'disconnected'
  });
});

// 🧩 MongoDB se connect karna (Atlas via .env)
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// 🔊 Server ko local port pe run karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔃 Server running on port ${PORT}`);
});
