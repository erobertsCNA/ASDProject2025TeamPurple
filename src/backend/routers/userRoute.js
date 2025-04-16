const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserById,
    deleteUserController,
    updateUserRole
} = require('../controllers/user.controller');

router.get('/', getAllUsers);         // Get all users
router.put('/:id', updateUserById);   // Update user by ID
router.delete('/users/:id', deleteUserController);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
