/**
 * Service Routes
 * 
 * Manages community services and their providers
 * 
 * Important: Service providers are Organizations referenced by ID
 * See organization.model.js for relationship details
 */

const express = require("express");
const serviceRouter = express.Router();
const {
    createService,
    // ... other controller imports
    deleteAllServicesByName
} = require("../controllers/service.controller.js");

// CREATE
serviceRouter.post('/', createService); // Add new service

// READ
serviceRouter.get('/', getAllServices); // List all services
serviceRouter.get('/id=:id', getServiceById); // Get service by ID
serviceRouter.get('/name=:name', getFirstServiceByName); // Search by name (first match)
serviceRouter.get('/names=:name', getAllServicesByName); // Search by name (all matches)

// UPDATE
serviceRouter.put('/', updateAllServices); // Bulk update services
serviceRouter.put('/id=:id', updateServiceById); // Update specific service
serviceRouter.put('/name=:name', updateFirstServiceByName); // Update first name match
serviceRouter.put('/names=:name', updateAllServicesByName); // Update all name matches

// DELETE
serviceRouter.delete('/', deleteAllServices); // Remove all services (Admin only)
serviceRouter.delete('/id=:id', deleteServiceById); // Delete by ID
serviceRouter.delete('/name=:name', deleteFirstServiceByName); // Delete first name match
serviceRouter.delete('/names=:name', deleteAllServicesByName); // Delete all name matches

module.exports = serviceRouter;