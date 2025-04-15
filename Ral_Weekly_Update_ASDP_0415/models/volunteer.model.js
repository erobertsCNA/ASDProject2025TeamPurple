const mongoose = require('mongoose');

const VolunteerSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required for volunteer opportunity"]
    },
    description: {
        type: String,
        required: [true, "Description is required for volunteer opportunity"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    timeCommitment: {
        hours: Number,
        frequency: String // e.g., "weekly", "monthly", "one-time"
    },
    skills: [{
        type: String
    }],
    contactPerson: {
        name: String,
        email: String,
        phone: String
    },
    status: {
        type: String,
        enum: ['active', 'filled', 'closed'],
        default: 'active'
    },
    applicants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Create indexes for faster querying
VolunteerSchema.index({ 'organization': 1 });
VolunteerSchema.index({ 'category': 1 });
VolunteerSchema.index({ 'status': 1 });
VolunteerSchema.index({ 'startDate': 1 });

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = Volunteer;