const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const { Token } = require("../models/auth.model.js");

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // Generate access token
        const accessToken = generateAccessToken(user._id);

        // Generate refresh token
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: "7d" });

        // Save refresh token to database
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now

        await Token.create({
            userId: user._id,
            token: refreshToken,
            type: 'refresh',
            expiresAt: expiryDate
        });

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "Strict",
            maxAge: 3600000  // 1 hour
        });

        // Return tokens and user info
        res.status(200).json({
            message: "Login successful!",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userRole: user.userRole
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User registration
exports.register = async (req, res) => {
    try {
        const {
            userId, firstName, lastName, dob, addressUnit, addressStreet, addressCity,
            addressStateProv, addressCountry, addressPostCode, phone, email, password,
            emergContactName, emergContactPhone, emergContactRel, userRole
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Create new user
        const newUser = new User({
            userId, firstName, lastName, dob, addressUnit, addressStreet, addressCity,
            addressStateProv, addressCountry, addressPostCode, phone, email, password,
            emergContactName, emergContactPhone, emergContactRel, userRole
        });

        // Save to database (password is automatically hashed via UserSchema)
        await newUser.save();

        // Generate token
        const accessToken = generateAccessToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully!",
            accessToken,
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userRole: newUser.userRole
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed.", details: error.message });
    }
};

// Refresh access token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

        // Check if token exists in database
        const tokenDoc = await Token.findOne({
            userId: decoded.userId,
            token: refreshToken,
            type: 'refresh',
            expiresAt: { $gt: new Date() }
        });

        if (!tokenDoc) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        // Generate new access token
        const accessToken = generateAccessToken(decoded.userId);

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

// Password reset request
exports.resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // Still return success for security (don't reveal if email exists)
            return res.status(200).json({ message: "If your email is registered, you will receive a reset link" });
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_RESET_SECRET || process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Save token to database
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour from now

        await Token.create({
            userId: user._id,
            token: resetToken,
            type: 'reset',
            expiresAt: expiryDate
        });

        // In a real application, send email with reset link here
        // For now, just return success message

        res.status(200).json({ message: "If your email is registered, you will receive a reset link" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Helper function to generate access token
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};