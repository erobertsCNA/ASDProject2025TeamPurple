const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['refresh', 'reset'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Automatically delete documents after 7 days
    }
});

// Index for faster lookups
TokenSchema.index({ userId: 1, type: 1 });

const AuthSessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create models
const Token = mongoose.model('Token', TokenSchema);
const AuthSession = mongoose.model('AuthSession', AuthSessionSchema);

module.exports = {
    Token,
    AuthSession
};