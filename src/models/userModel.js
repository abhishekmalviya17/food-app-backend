const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: String,
  address: [String], // array of addresses
  paymentMethods: [{
    cardNumber: String,
    expiryDate: String,
    cvv: String
  }],
  settings: {
    emailNotifications: {
      newDeals: Boolean,
      newRestaurants: Boolean,
      orderStatuses: Boolean,
      passwordChanges: Boolean,
      specialOffers: Boolean,
      newsletter: Boolean,
    }
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', userSchema);
