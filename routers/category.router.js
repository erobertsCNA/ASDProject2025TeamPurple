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

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/id=:id', getCategoryById);
categoryRouter.get('/name=:name', getFirstCategoryByName);
categoryRouter.get('/names=:name', getAllCategoriesByName);
categoryRouter.put('/', updateAllCategories);
categoryRouter.put('/id=:id', updateCategoryById);
categoryRouter.put('/name=:name', updateFirstCategoryByName);
categoryRouter.put('/names=:name', updateAllCategoriesByName);
categoryRouter.delete('/', deleteAllCategories);
categoryRouter.delete('/id=:id', deleteCategoryById);
categoryRouter.delete('/name=:name', deleteFirstCategoryByName);
categoryRouter.delete('/names=:name', deleteAllCategoriesByName);

module.exports = categoryRouter;