/**
 * User Routes
 * 
 * Handles user accounts and profiles
 * 
 * Security Note: Actual authentication is handled separately
 * in auth.routes.js. These routes manage user data only.
 */

const express = require("express");
const userRouter = express.Router();
const {
    createUser,
    // ... other controller imports
    deleteAllUsersByLastName
} = require("../controllers/user.controller.js");

// CREATE
userRouter.post('/', createUser); // Register new user

// READ
userRouter.get('/', getAllUsers); // List all users (admin only)
userRouter.get('/id=:id', getUserById); // Get user by ID
userRouter.get('/email=:email', getUserByEmail); // Search by email
userRouter.get('/fname=:fname/lname=:lname', getFirstUserByFirstLastName); // Search by full name
userRouter.get('/lnames=:lname', getAllUsersByLastName); // Search by last name

// UPDATE
userRouter.put('/', updateAllUsers); // Bulk update (admin only)
userRouter.put('/id=:id', updateUserById); // Update specific user
userRouter.put('/fname=:fname/lname=:lname', updateFirstUserByFirstLastName); // Update by name
userRouter.put('/lnames=:lname', updateAllUsersByLastName); // Update all matching last names

// DELETE
userRouter.delete('/', deleteAllUsers); // Remove all users (super admin only)
userRouter.delete('/id=:id', deleteUserById); // Delete by ID
userRouter.delete('/email=:email', deleteUserByEmail); // Delete by email
userRouter.delete('/fname=:fname/lname=:lname', deleteFirstUserByFirstLastName); // Delete by name
userRouter.delete('/lnames=:lname', deleteAllUsersByLastName); // Delete by last name

module.exports = userRouter;