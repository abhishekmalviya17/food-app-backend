const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const passport = require('passport');


router.post('/', passport.authenticate('jwt', { session: false }), reviewController.createReview);
router.get('/:reviewId', passport.authenticate('jwt', { session: false }), reviewController.getReview);
router.put('/:reviewId', passport.authenticate('jwt', { session: false }), reviewController.updateReview);
router.delete('/:reviewId', passport.authenticate('jwt', { session: false }), reviewController.deleteReview);

module.exports = router;
