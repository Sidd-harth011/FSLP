const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running!'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const db = mongoose.connection;
    console.log("Database Name:", db.name);
    })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
