const express = require("express");
const serviceRouter = express.Router();
const {
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
} = require("../controllers/service.controller.js");

serviceRouter.post('/', createService);
serviceRouter.get('/', getAllServices);
serviceRouter.get('/id=:id', getServiceById);
serviceRouter.get('/name=:name', getFirstServiceByName);
serviceRouter.get('/names=:name', getAllServicesByName);
serviceRouter.put('/', updateAllServices);
serviceRouter.put('/id=:id', updateServiceById);
serviceRouter.put('/name=:name', updateFirstServiceByName);
serviceRouter.put('/names=:name', updateAllServicesByName);
serviceRouter.delete('/', deleteAllServices);
serviceRouter.delete('/id=:id', deleteServiceById);
serviceRouter.delete('/name=:name', deleteFirstServiceByName);
serviceRouter.delete('/names=:name', deleteAllServicesByName);

module.exports = serviceRouter;