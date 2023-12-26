const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');


//Fetch 
router.get('/addresses', passport.authenticate('jwt', { session: false }), userController.fetchAddresses);

// POST request to create a new user
router.post('/', userController.createUser);

router.post('/login', userController.loginUser);
// GET request to retrieve a user by id
router.get('/:userId', userController.getUser);

// PUT request to update a user by id
router.put('/:userId', userController.updateUser);

// DELETE request to delete a user by id
router.delete('/:userId', userController.deleteUser);


// Add a new address to user's profile
router.post('/address/add', passport.authenticate('jwt', { session: false }), userController.addAddress);

// Remove an address from user's profile
router.post('/address/remove', passport.authenticate('jwt', { session: false }), userController.removeAddress);


// update an address from user's profile
router.put('/address/update', passport.authenticate('jwt', { session: false }), userController.updateAddress);



module.exports = router;


module.exports = router;
