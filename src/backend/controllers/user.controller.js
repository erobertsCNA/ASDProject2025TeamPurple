const User = require("../models/user.model.js");

// Insert a record
const createUser = async (req, res) => {
    console.log("Trying to create a user");
    console.log(req.body);
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve ALL records
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Retrieve record where _id matches the supplied id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (email)
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({email:req.params.email});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (firstName and lastName)
const getFirstUserByFirstLastName = async (req, res) => {
    try {
        const user = await User.findOne({firstName:req.params.fname, lastName:req.params.lname});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (lastName)
const getAllUsersByLastName = async (req, res) => {
    try {
        const users = await User.find({lastName:req.params.lname});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records and update the content of each.
const updateAllUsers = async (req, res) => {
    try {
        const users = await User.updateMany({}, req.body, {new:true});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve a record (by id) and update the content.
const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record (by name) and update the content.
const updateFirstUserByFirstLastName = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {firstName:req.params.fname, lastName:req.params.lname}, 
            req.body, 
            {new:true}
        );
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records (by name) and update the content of each.
const updateAllUsersByLastName = async (req, res) => {
    try {
        const users = await User.updateMany({lastName:req.params.lname}, req.body, {new:true});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}; 
  
// Delete All records
const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteMany({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete a record by Id
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete a record by email
const deleteUserByEmail = async (req, res) => {
    try {
        const user = await User.deleteOne({email:req.params.email});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first record that match a filter (firstName and lastName)
const deleteFirstUserByFirstLastName = async (req, res) => {
    try {
        const user = await User.deleteOne({firstName:req.params.fname, lastName:req.params.lname});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all records that match a filter (lastName)
const deleteAllUsersByLastName = async (req, res) => {
    try {
        const user = await User.deleteMany({lastName:req.params.lname});
        res.status(200).json(user);
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