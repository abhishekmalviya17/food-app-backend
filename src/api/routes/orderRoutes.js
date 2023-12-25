const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), orderController.createOrder);
router.get('/:orderId',passport.authenticate('jwt', { session: false }),  orderController.getOrder);
router.put('/:orderId',passport.authenticate('jwt', { session: false }),  orderController.updateOrder);
router.delete('/:orderId',passport.authenticate('jwt', { session: false }),  orderController.deleteOrder);

module.exports = router;
