const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request to create a new user
router.post('/', userController.createUser);

// GET request to retrieve a user by id
router.get('/:userId', userController.getUser);

// PUT request to update a user by id
router.put('/:userId', userController.updateUser);

// DELETE request to delete a user by id
router.delete('/:userId', userController.deleteUser);

module.exports = router;
