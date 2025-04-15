/**
 * Authentication Routes
 *
 * Handles user authentication and authorization
 */

const express = require("express");
const authRouter = express.Router();
const {
    login,
    register,
    refreshToken,
    resetPassword
} = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Authentication
authRouter.post('/login', login); // User login
authRouter.post('/register', register); // User registration
authRouter.post('/refresh-token', refreshToken); // Refresh JWT token
authRouter.post('/reset-password', resetPassword); // Password reset request

// Protected route example
authRouter.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: "Profile accessed successfully", user: req.user });
});

module.exports = authRouter;