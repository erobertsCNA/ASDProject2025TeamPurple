const Resource = require('../models/resource');

async function createResource(req, res) {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
}

async function getAllResources(req, res) {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resources', error: error.message });
  }
}

async function getResourceById(req, res) {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resource', error: error.message });
  }
}

async function updateResource(req, res) {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
}

async function deleteResource(req, res) {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
}

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};