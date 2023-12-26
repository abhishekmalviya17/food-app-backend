const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const passport = require('passport');
// Ensure authentication for  routes
router.use(passport.authenticate('jwt', { session: false }));

router.get('/restaurant/:restaurantId', menuItemController.getMenuItemsByRestaurant);

module.exports = router;
