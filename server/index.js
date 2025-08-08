const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running!'));

app.post('/api/formdata', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: 'User data saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving user data', error: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
   console.log('MongoDB connected');
   const db = mongoose.connection;
   console.log("Database Name:", db.name);
   })
 .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
