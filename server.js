const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes); // Utilisez userRoutes pour les endpoints des utilisateurs

const mongoUri = 'mongodb://localhost:27017/users';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB on localhost');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
