require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const authMiddleware = require('./middleware/authMiddleware');

// Import routers
const categoryRouter = require('./routers/category.router.js');
const organizationRouter = require('./routers/organization.router.js');
const resourceRouter = require('./routers/resource.router.js');
const serviceRouter = require('./routers/service.router.js');
const userRouter = require('./routers/user.router.js');
const volunteerRouter = require('./routers/volunteer.router.js');
const authRouter = require('./routers/auth.router.js');
const protectedRoute = require('./routers/protectedRoute.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies (JWT)
}));

app.use(express.json());

// API Routes
app.use('/api/categories', categoryRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);
app.use('/api/volunteers', volunteerRouter);
app.use('/api/auth', authRouter);
app.use('/api', protectedRoute);

// Note: The following routes are kept for backward compatibility
// These should eventually be removed once all frontend code is updated
// to use the new API endpoints

// Protected Dashboard Route
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the dashboard!", userId: req.user.userId });
});

// Protected Admin Dashboard Route
app.get('/admindashboard', authMiddleware, (req, res) => {
    if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: "Access denied: Admins only." });
    }

    res.json({ message: "Welcome to the admin dashboard!", userId: req.user.userId });
});

// Temporary: Legacy versions of auth routes
// These should be deprecated in favor of /api/auth/* routes
app.post('/register', async (req, res) => {
    try {
        // Forward this request to the proper auth controller
        const authResponse = await fetch(`http://localhost:${port}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await authResponse.json();
        res.status(authResponse.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed." });
    }
});

app.post('/login', async (req, res) => {
    try {
        // Forward this request to the proper auth controller
        const authResponse = await fetch(`http://localhost:${port}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await authResponse.json();

        // If login was successful, set cookie consistent with auth controller
        if (authResponse.status === 200 && data.accessToken) {
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("token", data.accessToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: "Strict",
                maxAge: 3600000  // 1 hour
            });
        }

        res.status(authResponse.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed." });
    }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Failed to connect to the database:", err.message);
    });

module.exports = app;