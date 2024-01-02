const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: 0000 },
  address: [addressSchema], // Array of address objects
  paymentMethods: [{
    cardNumber: String,
    expiryDate: String,
    cvv: String
  }],
  settings: {
    emailNotifications: {
      newDeals: { type: Boolean, default: false },
      newRestaurants: { type: Boolean, default: false },
      orderStatuses: { type: Boolean, default: false },
      passwordChanges: { type: Boolean, default: false },
      specialOffers: { type: Boolean, default: false },
      newsletter: { type: Boolean, default: false },
    }
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', userSchema);
