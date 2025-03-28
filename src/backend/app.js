require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.model'); // Import your existing User model

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

        res.status(200).json({ message: "Login successful!", user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.userRole } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed." });
    }
});

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(() => {
        console.log("Failed to connect to the database.");
    });
