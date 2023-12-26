// src/api/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');

// Ensure authentication for cart routes
router.use(passport.authenticate('jwt', { session: false }));

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.post('/remove', cartController.removeFromCart);
router.post('/increase', cartController.increaseQuantity);
router.post('/decrease', cartController.decreaseQuantity);


module.exports = router;
