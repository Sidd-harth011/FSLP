// saveData.js
const express = require('express');
const router = express.Router();
const User = require('./models/Users'); // your existing schema

// POST: Save formData + location after OTP verification
router.post('/save-data', async (req, res) => {
  try {
    const { formData, location } = req.body;

    if (!formData || !location) {
      return res.status(400).json({ success: false, message: 'Missing form data or location' });
    }

    // Merge formData and location into one object for User model
    const newUser = new User({
      ...formData,
      location
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'User data saved successfully' });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ success: false, message: 'Error saving user data', error: err.message });
  }
});

module.exports = router;
