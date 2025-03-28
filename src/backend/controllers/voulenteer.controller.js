const Volunteer = require('../models/volunteer');

async function createVolunteer(req, res) {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating volunteer post', error: error.message });
  }
}

async function getAllVolunteers(req, res) {
  try {
    const volunteers = await Volunteer.find({});
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving volunteer posts', error: error.message });
  }
}

async function getVolunteerById(req, res) {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer post not found' });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving volunteer post', error: error.message });
  }
}

async function updateVolunteer(req, res) {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!volunteer) return res.status(404).json({ message: 'Volunteer post not found' });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating volunteer post', error: error.message });
  }
}

async function deleteVolunteer(req, res) {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer post not found' });
    res.json({ message: 'Volunteer post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting volunteer post', error: error.message });
  }
}

module.exports = {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
};