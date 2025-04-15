/**
 * Resource Routes
 *
 * Manages community resource listings and information
 */

const express = require("express");
const resourceRouter = express.Router();
const {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
} = require("../controllers/resource.controller.js");

// CREATE
resourceRouter.post('/', createResource); // Create new resource

// READ
resourceRouter.get('/', getAllResources); // Get all resources
resourceRouter.get('/id=:id', getResourceById); // Get resource by ID

// UPDATE
resourceRouter.put('/id=:id', updateResource); // Update resource by ID

// DELETE
resourceRouter.delete('/id=:id', deleteResource); // Delete resource by ID

module.exports = resourceRouter;