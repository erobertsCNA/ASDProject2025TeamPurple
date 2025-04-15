const Organization = require("../models/organization.model.js");

// Insert a record
const createOrganization = async (req, res) => {
    console.log("Trying to create an organization");
    console.log(req.body);
    try {
        const org = await Organization.create(req.body);
        res.status(200).json(org);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve ALL records
const getAllOrganizations = async (req, res) => {
    try {
        const orgs = await Organization.find({});
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Retrieve record where _id matches the supplied id
const getOrganizationById = async (req, res) => {
    try {
        const org = await Organization.findById(req.params.id);
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (orgName)
const getFirstOrganizationByName = async (req, res) => {
    try {
        const org = await Organization.findOne({orgName:req.params.name});
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (orgName)
const getAllOrganizationsByName = async (req, res) => {
    try {
        const orgs = await Organization.find({orgName:req.params.name});
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records and update the content of each.
const updateAllOrganizations = async (req, res) => {
    try {
        const orgs = await Organization.updateMany({}, req.body);
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve a record (by id) and update the content.
const updateOrganizationById = async (req, res) => {
    try {
        const org = await Organization.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record (by name) and update the content.
const updateFirstOrganizationByName = async (req, res) => {
    try {
        const org = await Organization.findOneAndUpdate({orgName:req.params.name}, req.body);
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records (by name) and update the content of each.
const updateAllOrganizationsByName = async (req, res) => {
    try {
        const orgs = await Organization.updateMany({orgName:req.params.name}, req.body);
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}; 
  
// Delete All records
const deleteAllOrganizations = async (req, res) => {
    try {
        const orgs = await Organization.deleteMany({});
        res.status(200).json(orgs);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

//Delete a record by Id
const deleteOrganizationById = async (req, res) => {
    try {
        const org = await Organization.findByIdAndDelete(req.params.id);
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first record that match a filter (orgName)
const deleteFirstOrganizationByName = async (req, res) => {
    try {
        const org = await Organization.deleteOne({orgName:req.params.name});
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all records that match a filter (orgName)
const deleteAllOrganizationsByName = async (req, res) => {
    try {
        const org = await Organization.deleteMany({orgName:req.params.name});
        res.status(200).json(org);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    getFirstOrganizationByName,
    getAllOrganizationsByName,
    updateAllOrganizations,
    updateOrganizationById,
    updateFirstOrganizationByName,
    updateAllOrganizationsByName,
    deleteAllOrganizations,
    deleteOrganizationById,
    deleteFirstOrganizationByName,
    deleteAllOrganizationsByName  
};