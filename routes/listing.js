// routes/listing.js

const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Route pour créer une nouvelle annonce
router.post('/listings', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newListing = new Listing({ title, description });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// Autres routes CRUD (GET, PUT, DELETE) pour gérer les annonces existantes

module.exports = router;
