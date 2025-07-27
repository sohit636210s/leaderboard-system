// 🛠️ Express aur Mongoose import karna
const express = require('express');
const mongoose = require('mongoose');

// 📦 dotenv ke through env file load karna
const dotenv = require('dotenv');
dotenv.config();

// 🚀 Express app initialize karna
const app = express();

// 📨 JSON request body ko parse karna
app.use(express.json());

// 🛣️ Routes connect karna (Booking, Worker, Customer APIs)
const bookingRoutes = require('./routes/bookingRoutes');
const workerRoutes = require('./routes/workerRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/api/bookings', bookingRoutes);      // 🔨 Booking APIs
app.use('/api/workers', workerRoutes);        // 👷 Worker APIs
app.use('/api/customers', customerRoutes);    // 🧑‍💼 Customer APIs

// 🧩 MongoDB se connect karna (Atlas via .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// 🔊 Server ko local port pe run karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔃 Server running on port ${PORT}`);
});
