require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model'); // Import your existing User model
const authMiddleware = require('./middleware/authMiddleware'); // Import auth middleware
const cookieParser = require("cookie-parser");
const userRoutes = require('./routers/userRoute');

const app = express();
const backport = process.env.BACKPORT || 5000;

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies (JWT)
}));

app.use(express.json());
app.use('/', require('./routers/userRoute'));


// Register Route
app.post('/register', async (req, res) => {
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

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed." });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Compare passwords using the method from the User model
        const match = await user.comparePassword(password);

        if (!match) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const isProduction = process.env.NODE_ENV === "production"; // Check if you're in production

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction, // Use HTTPS only in production
            sameSite: "Strict",
            maxAge: 3600000  // 1 hour
        });

        res.status(200).json({
            message: "Login successful!",
            token, // Send token to frontend
            userRole: user.userRole, // Send userRole alongside the token
            user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.userRole }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed." });
    }
});

// Protected Dashboard Route
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the dashboard!", userId: req.user.userId });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(backport, () => {
            console.log(`Server running on port ${backport}`);
        });
    })
    .catch(() => {
        console.log("Failed to connect to the database.");
    });

// Protected Admin Dashboard Route
app.get('/admindashboard', authMiddleware, (req, res) => {
    if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: "Access denied: Admins only." });
    }

    res.json({ message: "Welcome to the admin dashboard!", userId: req.user.userId });
});

// Retrieve ALL records
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update User Role Route (PATCH)
app.patch('/users/:userId/role', async (req, res) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;

        const user = await User.findOneAndUpdate(
            { userId },
            { userRole: newRole },
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User role updated successfully!",
            user: { userId: user.userId, role: user.userRole }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user role." });
    }
});

// Delete User Route (DELETE)
app.delete('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await User.findOneAndDelete({ userId });

        if (!result) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user." });
    }
});

//dev endpoint only - remove once finished

app.delete('/dev/wipe-users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: "All users deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

