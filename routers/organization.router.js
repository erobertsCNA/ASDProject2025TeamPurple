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

organizationRouter.post('/', createOrganization);
organizationRouter.get('/', getAllOrganizations);
organizationRouter.get('/id=:id', getOrganizationById);
organizationRouter.get('/name=:name', getFirstOrganizationByName);
organizationRouter.get('/names=:name', getAllOrganizationsByName);
organizationRouter.put('/', updateAllOrganizations);
organizationRouter.put('/id=:id', updateOrganizationById);
organizationRouter.put('/name=:name', updateFirstOrganizationByName);
organizationRouter.put('/names=:name', updateAllOrganizationsByName);
organizationRouter.delete('/', deleteAllOrganizations);
organizationRouter.delete('/id=:id', deleteOrganizationById);
organizationRouter.delete('/name=:name', deleteFirstOrganizationByName);
organizationRouter.delete('/names=:name', deleteAllOrganizationsByName);

module.exports = organizationRouter;