// server/saveData.js
const express = require('express');
const router = express.Router();
const User = require('./models/Users');

router.post('/save-data', async (req, res) => {
  try {
    const { formData, location } = req.body;
    if (!formData) return res.status(400).json({ success: false, message: 'Missing formData' });

    const newUser = new User({
      ...formData,
      location
    });

    await newUser.save();
    return res.json({ success: true, message: 'Saved successfully' });
  } catch (err) {
    console.error('save-data error:', err);
    return res.status(500).json({ success: false, message: 'Save failed' });
  }
});

module.exports = router;
