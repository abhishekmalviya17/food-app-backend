const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  categories: [String],
  featured: { type: Boolean, default: false },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
