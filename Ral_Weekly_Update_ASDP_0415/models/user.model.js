const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * User Model Schema
 *
 * Stores user account information including contact details,
 * authentication credentials, and emergency contact information
 */
const UserSchema = mongoose.Schema({
    // Auto-incremented user ID
    userId: {
        type: Number
    },

    // Personal Information
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },

    // Contact Information
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },

    // Address Information
    addressUnit: {
        type: Number,
        required: [true, "Unit number is required"]
    },
    addressStreet: {
        type: String,
        required: [true, "Street address is required"]
    },
    addressCity: {
        type: String,
        required: [true, "City is required"]
    },
    addressStateProv: {
        type: String,
        required: [true, "State/Province is required"]
    },
    addressCountry: {
        type: String,
        required: [true, "Country is required"]
    },
    addressPostCode: {
        type: String,
        required: [true, "Postal code is required"]
    },

    // Authentication
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"]
    },

    // User Role and Status
    userRole: {
        type: String,
        enum: ['user', 'volunteer', 'admin', 'superadmin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },

    // Emergency Contact
    emergContactName: {
        type: String,
        required: [true, "Emergency contact name is required"]
    },
    emergContactPhone: {
        type: String,
        required: [true, "Emergency contact phone is required"]
    },
    emergContactRel: {
        type: String,
        required: [true, "Emergency contact relationship is required"]
    },

    // Additional fields from users.js
    title: {
        type: String
    },
    description: String,
    link: String,

    // Profile Information
    profilePicture: String,
    bio: String,
    skills: [String],
    interests: [String],

    // Volunteer-specific fields
    volunteerHistory: [{
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        position: String,
        startDate: Date,
        endDate: Date,
        hours: Number
    }],

    // Preferences
    notificationPreferences: {
        email: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

// Indexes for faster querying
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ lastName: 1, firstName: 1 });
UserSchema.index({ userRole: 1 });

// Auto-increment userId field
UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare entered and hashed password
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create a virtual for the full name
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Create virtual for full address
UserSchema.virtual('fullAddress').get(function() {
    return `Unit ${this.addressUnit}, ${this.addressStreet}, ${this.addressCity}, ${this.addressStateProv}, ${this.addressCountry}, ${this.addressPostCode}`;
});

// Method to format user data for public API responses (excludes sensitive information)
UserSchema.methods.toPublicJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;