// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const otpRoute = require('./serviceRoutes/otpRoutes');
const User = require('./models/Users'); // Your Mongoose schema

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const db = mongoose.connection;
    console.log("Database Name:", db.name);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', otpRoute);

// ✅ New route to save formData + location after OTP verification
app.post('/api/save-data', async (req, res) => {
  try {
    const { formData, location } = req.body;

    if (!formData || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing form data or location'
      });
    }

    const newUser = new User({
      ...formData,
      location
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'User data saved successfully'
    });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({
      success: false,
      message: 'Error saving user data',
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
