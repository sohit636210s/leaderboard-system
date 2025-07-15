const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Enable CORS for frontend/backend communication
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// ================== ROUTE IMPORTS ==================

// Routes for user operations (create, fetch)
const userRoutes = require('./routes/userRoutes');

// Routes for claim operations (claim points, leaderboard, history)
const claimRoutes = require('./routes/claimRoutes');

// ================== ROUTE MOUNTING ==================

// All routes prefixed with /api for consistency
app.use('/api', userRoutes);
app.use('/api', claimRoutes);

// Health check endpoint (optional)
app.get('/', (req, res) => res.send('API is running successfully'));

// ================== SERVER START ==================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
