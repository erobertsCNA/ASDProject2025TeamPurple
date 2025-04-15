const User = require("../models/user.model.js");

/**
 * User Controller
 *
 * Handles all operations related to user accounts and profiles
 */

// CREATE
// Insert a new user record
const createUser = async (req, res) => {
    console.log("Trying to create a user");
    console.log(req.body);
    try {
        const user = await User.create(req.body);

        // Remove password from response
        const userResponse = user.toPublicJSON();

        res.status(201).json(userResponse);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
// Retrieve ALL users (with pagination)
const getAllUsers = async (req, res) => {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Apply filters if provided
        const filter = {};
        if (req.query.role) filter.userRole = req.query.role;
        if (req.query.isActive) filter.isActive = req.query.isActive === 'true';

        const users = await User.find(filter)
            .select('-password') // Exclude password
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Get total count for pagination info
        const totalCount = await User.countDocuments(filter);

        res.status(200).json({
            totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
            users
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve record where _id matches the supplied id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve user by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email}).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (firstName and lastName)
const getFirstUserByFirstLastName = async (req, res) => {
    try {
        const user = await User.findOne({
            firstName: req.params.fname,
            lastName: req.params.lname
        }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (lastName)
const getAllUsersByLastName = async (req, res) => {
    try {
        const users = await User.find({lastName: req.params.lname}).select('-password');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// UPDATE
// Update all users (admin only)
const updateAllUsers = async (req, res) => {
    try {
        // Remove password from bulk update for security
        const updateData = { ...req.body };
        if (updateData.password) delete updateData.password;

        const result = await User.updateMany({}, updateData, {new: true});
        res.status(200).json({
            message: `${result.modifiedCount} users updated successfully`,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        // If password is being updated, it will be hashed by the model's pre-save hook
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Update first user by name
const updateFirstUserByFirstLastName = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {firstName: req.params.fname, lastName: req.params.lname},
            req.body,
            {new: true, runValidators: true}
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Update all users by last name
const updateAllUsersByLastName = async (req, res) => {
    try {
        // Remove password from bulk update for security
        const updateData = { ...req.body };
        if (updateData.password) delete updateData.password;

        const result = await User.updateMany(
            {lastName: req.params.lname},
            updateData,
            {new: true}
        );

        res.status(200).json({
            message: `${result.modifiedCount} users updated successfully`,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// DELETE
// Delete all users (super admin only)
const deleteAllUsers = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.status(200).json({
            message: `${result.deletedCount} users deleted successfully`,
            deletedCount: result.deletedCount
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            id: req.params.id
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete user by email
const deleteUserByEmail = async (req, res) => {
    try {
        const result = await User.deleteOne({email: req.params.email});

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            email: req.params.email
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first user by name
const deleteFirstUserByFirstLastName = async (req, res) => {
    try {
        const result = await User.deleteOne({
            firstName: req.params.fname,
            lastName: req.params.lname
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            firstName: req.params.fname,
            lastName: req.params.lname
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all users by last name
const deleteAllUsersByLastName = async (req, res) => {
    try {
        const result = await User.deleteMany({lastName: req.params.lname});

        res.status(200).json({
            message: `${result.deletedCount} users deleted successfully`,
            deletedCount: result.deletedCount,
            lastName: req.params.lname
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getFirstUserByFirstLastName,
    getAllUsersByLastName,
    updateAllUsers,
    updateUserById,
    updateFirstUserByFirstLastName,
    updateAllUsersByLastName,
    deleteAllUsers,
    deleteUserById,
    deleteUserByEmail,
    deleteFirstUserByFirstLastName,
    deleteAllUsersByLastName
};