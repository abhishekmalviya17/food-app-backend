const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const passport = require('passport');

router.post('/',passport.authenticate('jwt', { session: false }), categoryController.createCategory);

router.get('/', passport.authenticate('jwt', { session: false }), categoryController.getCategories);

module.exports = router;
