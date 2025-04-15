const Volunteer = require('../models/volunteer.model.js');
const Organization = require('../models/organization.model.js');

// Create volunteer opportunity
const createVolunteer = async (req, res) => {
    console.log("Trying to create a volunteer opportunity");
    console.log(req.body);

    try {
        // Check if organization exists
        if (req.body.organization) {
            const orgExists = await Organization.findById(req.body.organization);
            if (!orgExists) {
                return res.status(400).json({ message: "Organization not found" });
            }
        }

        const volunteer = await Volunteer.create(req.body);
        res.status(201).json(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating volunteer opportunity', error: error.message });
    }
};

// Get all volunteer opportunities with optional filtering
const getAllVolunteers = async (req, res) => {
    try {
        // Build query based on request query parameters
        const query = {};

        // Filter by status if provided
        if (req.query.status) {
            query.status = req.query.status;
        }

        // Filter by organization if provided
        if (req.query.organization) {
            query.organization = req.query.organization;
        }

        // Filter by category if provided
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Date range filtering
        if (req.query.fromDate) {
            query.startDate = { $gte: new Date(req.query.fromDate) };
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Execute query with pagination and populate organization details
        const volunteers = await Volunteer.find(query)
            .populate('organization', 'orgName orgType')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Get total count for pagination
        const totalCount = await Volunteer.countDocuments(query);

        res.status(200).json({
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
            volunteers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving volunteer opportunities', error: error.message });
    }
};

// Get volunteer opportunity by ID
const getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id)
            .populate('organization', 'orgName orgType');

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer opportunity not found' });
        }

        res.status(200).json(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving volunteer opportunity', error: error.message });
    }
};

// Update volunteer opportunity
const updateVolunteer = async (req, res) => {
    try {
        // Check if organization exists if being updated
        if (req.body.organization) {
            const orgExists = await Organization.findById(req.body.organization);
            if (!orgExists) {
                return res.status(400).json({ message: "Organization not found" });
            }
        }

        const volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer opportunity not found' });
        }

        res.status(200).json(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating volunteer opportunity', error: error.message });
    }
};

// Delete volunteer opportunity
const deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer opportunity not found' });
        }

        res.status(200).json({ message: 'Volunteer opportunity deleted successfully', id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting volunteer opportunity', error: error.message });
    }
};

// Apply for volunteer opportunity
const applyForVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer opportunity not found' });
        }

        // Check if already applied
        const alreadyApplied = volunteer.applicants.some(
            applicant => applicant.userId.toString() === req.user.id
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this opportunity' });
        }

        // Add application
        volunteer.applicants.push({
            userId: req.user.id,
            status: 'pending',
            appliedAt: new Date()
        });

        await volunteer.save();

        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error applying for volunteer opportunity', error: error.message });
    }
};

// Update application status (for organization admins)
const updateApplicationStatus = async (req, res) => {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
        return res.status(400).json({ message: 'Application ID and status are required' });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending, approved, or rejected' });
    }

    try {
        const volunteer = await Volunteer.findOneAndUpdate(
            {
                _id: req.params.id,
                'applicants._id': applicationId
            },
            {
                $set: { 'applicants.$.status': status }
            },
            { new: true }
        );

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer opportunity or application not found' });
        }

        res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating application status', error: error.message });
    }
};

module.exports = {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer,
    applyForVolunteer,
    updateApplicationStatus
};