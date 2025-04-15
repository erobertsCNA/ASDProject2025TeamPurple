const Resource = require('../models/resource.js');

/**
 * Resource Controller
 *
 * Handles CRUD operations for community resources
 */

// Create new resource
async function createResource(req, res) {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
}

// Get all resources with optional filtering
async function getAllResources(req, res) {
  try {
    // Build query based on request query parameters
    const query = {};

    // Filter by title if provided (partial match)
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resources = await Resource.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalCount = await Resource.countDocuments(query);

    res.status(200).json({
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      resources
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resources', error: error.message });
  }
}

// Get resource by ID
async function getResourceById(req, res) {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resource', error: error.message });
  }
}

// Update resource by ID
async function updateResource(req, res) {
  try {
    const resource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
}

// Delete resource by ID
async function deleteResource(req, res) {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted successfully', id: req.params.id });
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