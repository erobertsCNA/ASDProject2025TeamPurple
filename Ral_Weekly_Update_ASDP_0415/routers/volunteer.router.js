/**
* Volunteer Routes
*
* Manages volunteer opportunities and applications
*/

const express = require("express");
const volunteerRouter = express.Router();
const {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer,
    applyForVolunteer,
    updateApplicationStatus
} = require("../controllers/volunteer.controller.js");

// CREATE
volunteerRouter.post('/', createVolunteer); // Create new volunteer opportunity

// READ
volunteerRouter.get('/', getAllVolunteers); // Get all volunteer opportunities
volunteerRouter.get('/id=:id', getVolunteerById); // Get opportunity by ID

// UPDATE
volunteerRouter.put('/id=:id', updateVolunteer); // Update volunteer opportunity
volunteerRouter.post('/id=:id/apply', applyForVolunteer); // Apply for volunteer opportunity
volunteerRouter.put('/id=:id/application', updateApplicationStatus); // Update application status

// DELETE
volunteerRouter.delete('/id=:id', deleteVolunteer); // Delete volunteer opportunity

module.exports = volunteerRouter;