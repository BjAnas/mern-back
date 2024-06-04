// models/Listing.js

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Autres champs
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
