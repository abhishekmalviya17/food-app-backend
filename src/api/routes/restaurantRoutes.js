const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const passport = require('passport');


router.get('/byCategory', passport.authenticate('jwt', { session: false }), restaurantController.getRestaurantsByCategory);
router.post('/', passport.authenticate('jwt', { session: false }), restaurantController.createRestaurant);
router.get('/', passport.authenticate('jwt', { session: false }), restaurantController.getAllRestaurants);
router.get('/:restaurantId', passport.authenticate('jwt', { session: false }), restaurantController.getRestaurant);
router.put('/:restaurantId', passport.authenticate('jwt', { session: false }), restaurantController.updateRestaurant);
router.delete('/:restaurantId', passport.authenticate('jwt', { session: false }), restaurantController.deleteRestaurant);


module.exports = router;
