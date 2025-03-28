const Service = require("../models/service.model.js");

// Insert a record
const createService = async (req, res) => {
    console.log("Trying to create a service");
    console.log(req.body);
    try {
        const service = await Service.create(req.body);
        res.status(200).json(service);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve ALL records
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Retrieve record where _id matches the supplied id
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (serviceName)
const getFirstServiceByName = async (req, res) => {
    try {
        const service = await Service.findOne({serviceName:req.params.name});
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (serviceName)
const getAllServicesByName = async (req, res) => {
    try {
        const services = await Service.find({serviceName:req.params.name});
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records and update the content of each.
const updateAllServices = async (req, res) => {
    try {
        const services = await Service.updateMany({}, req.body);
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve a record (by id) and update the content.
const updateServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record (by name) and update the content.
const updateFirstServiceByName = async (req, res) => {
    try {
        const service = await Service.findOneAndUpdate({serviceName:req.params.name}, req.body);
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records (by name) and update the content of each.
const updateAllServicesByName = async (req, res) => {
    try {
        const services = await Service.updateMany({serviceName:req.params.name}, req.body);
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}; 
  
// Delete All records
const deleteAllServices = async (req, res) => {
    try {
        const services = await Service.deleteMany({});
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

//Delete a record by Id
const deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first record that match a filter (serviceName)
const deleteFirstServiceByName = async (req, res) => {
    try {
        const service = await Service.deleteOne({serviceName:req.params.name});
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all records that match a filter (serviceName)
const deleteAllServicesByName = async (req, res) => {
    try {
        const service = await Service.deleteMany({serviceName:req.params.name});
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    getFirstServiceByName,
    getAllServicesByName,
    updateAllServices,
    updateServiceById,
    updateFirstServiceByName,
    updateAllServicesByName,
    deleteAllServices,
    deleteServiceById,
    deleteFirstServiceByName,
    deleteAllServicesByName  
};