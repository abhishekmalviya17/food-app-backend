const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    });
  };

// POST request to create a new user
router.post('/', userController.createUser);

router.post('/login', userController.loginUser);
// GET request to retrieve a user by id
router.get('/:userId', userController.getUser);

// PUT request to update a user by id
router.put('/:userId', userController.updateUser);

// DELETE request to delete a user by id
router.delete('/:userId', userController.deleteUser);

module.exports = router;
