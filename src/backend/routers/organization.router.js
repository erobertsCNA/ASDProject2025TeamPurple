/**
 * Organization Routes
 * 
 * Manages organization entities and their relationships
 * 
 * Note: Organization-Service relationships are handled through
 * the service routes using organization IDs
 */

const express = require("express");
const organizationRouter = express.Router();
const {
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
} = require("../controllers/organization.controller.js");

// CREATE
organizationRouter.post('/', createOrganization); // Register new organization

// READ
organizationRouter.get('/', getAllOrganizations); // List all organizations
organizationRouter.get('/id=:id', getOrganizationById); // Get organization by ID
organizationRouter.get('/name=:name', getFirstOrganizationByName); // Search by name (first match)
organizationRouter.get('/names=:name', getAllOrganizationsByName); // Search by name (all matches)

// UPDATE
organizationRouter.put('/', updateAllOrganizations); // Bulk update (admin only)
organizationRouter.put('/id=:id', updateOrganizationById); // Update specific org
organizationRouter.put('/name=:name', updateFirstOrganizationByName); // Update first name match
organizationRouter.put('/names=:name', updateAllOrganizationsByName); // Update all name matches

// DELETE
organizationRouter.delete('/', deleteAllOrganizations); // Clear all organizations (admin only)
organizationRouter.delete('/id=:id', deleteOrganizationById); // Delete by ID
organizationRouter.delete('/name=:name', deleteFirstOrganizationByName); // Delete first name match
organizationRouter.delete('/names=:name', deleteAllOrganizationsByName); // Delete all name matches

module.exports = organizationRouter;