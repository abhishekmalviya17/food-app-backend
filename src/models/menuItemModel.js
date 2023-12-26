const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' } // Reference to the restaurant
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
