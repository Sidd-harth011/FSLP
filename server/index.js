// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const otpRoute = require('./serviceRoutes/otpRoutes');
const User = require('./models/Users'); // existing schema

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    const db = mongoose.connection;
    console.log('Database Name:', db.name);
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Health
app.get('/', (req, res) => res.send('API Running!'));

// OTP routes (send-otp, get-otp)
app.use('/api', otpRoute);

// Save form data after OTP verification
app.post('/api/save-data', async (req, res) => {
  try {
    const { formData, location } = req.body;
    if (!formData || !location) {
      return res.status(400).json({ success: false, message: 'Missing formData or location' });
    }
    // create user doc by merging formData and location
    const newUser = new User({
      ...formData,
      location
    });
    await newUser.save();
    return res.status(200).json({ success: true, message: 'User data saved successfully' });
  } catch (err) {
    console.error('Error saving user data:', err);
    return res.status(500).json({ success: false, message: 'Error saving user data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
