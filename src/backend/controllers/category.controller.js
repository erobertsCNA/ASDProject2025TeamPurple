const Category = require("../models/category.model.js");

// Insert a record
const createCategory = async (req, res) => {
    console.log("Trying to create a category");
    console.log(req.body);
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve ALL records
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Retrieve record where _id matches the supplied id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (categoryName)
const getFirstCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOne({categoryName:req.params.name});
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (categoryName)
const getAllCategoriesByName = async (req, res) => {
    try {
        const categories = await Category.find({categoryName:req.params.name});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records and update the content of each.
const updateAllCategories = async (req, res) => {
    try {
        const categories = await Category.updateMany({}, req.body);
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve a record (by id) and update the content.
const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record (by name) and update the content.
const updateFirstCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({categoryName:req.params.name}, req.body);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records (by name) and update the content of each.
const updateAllCategoriesByName = async (req, res) => {
    try {
        const categories = await Category.updateMany({categoryName:req.params.name}, req.body);
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}; 
  
// Delete All records
const deleteAllCategories = async (req, res) => {
    try {
        const categories = await Category.deleteMany({});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

//Delete a record by Id
const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first record that match a filter (categoryName)
const deleteFirstCategoryByName = async (req, res) => {
    try {
        const category = await Category.deleteOne({categoryName:req.params.name});
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all records that match a filter (categoryName)
const deleteAllCategoriesByName = async (req, res) => {
    try {
        const category = await Category.deleteMany({categoryName:req.params.name});
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    getFirstCategoryByName,
    getAllCategoriesByName,
    updateAllCategories,
    updateCategoryById,
    updateFirstCategoryByName,
    updateAllCategoriesByName,
    deleteAllCategories,
    deleteCategoryById,
    deleteFirstCategoryByName,
    deleteAllCategoriesByName  
};