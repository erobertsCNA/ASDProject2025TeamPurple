/**
 * Category Routes
 * 
 * Handles all CRUD operations for categories
 */

const express = require("express");
const categoryRouter = express.Router();
const {
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
} = require("../controllers/category.controller.js");

// CREATE
categoryRouter.post('/', createCategory); // Create new category

// READ
categoryRouter.get('/', getAllCategories); // Get all categories
categoryRouter.get('/id=:id', getCategoryById); // Get single category by ID
categoryRouter.get('/name=:name', getFirstCategoryByName); // Get first match by name
categoryRouter.get('/names=:name', getAllCategoriesByName); // Get all matches by name

// UPDATE
categoryRouter.put('/', updateAllCategories); // Update all categories
categoryRouter.put('/id=:id', updateCategoryById); // Update specific category
categoryRouter.put('/name=:name', updateFirstCategoryByName); // Update first match by name
categoryRouter.put('/names=:name', updateAllCategoriesByName); // Update all matches by name

// DELETE
categoryRouter.delete('/', deleteAllCategories); // Delete all categories (Admin only)
categoryRouter.delete('/id=:id', deleteCategoryById); // Delete by ID
categoryRouter.delete('/name=:name', deleteFirstCategoryByName); // Delete first match by name
categoryRouter.delete('/names=:name', deleteAllCategoriesByName); // Delete all matches by name

module.exports = categoryRouter;