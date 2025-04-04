const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Attach user info to request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
