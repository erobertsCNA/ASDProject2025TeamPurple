'const Course = require ("../models/course.model.js");'
// Insert a record
const createCourse = async (req, res) => {
    // The browser uses the GET method to send any message, so
    // use postman to send a POST message to the app.
    try {
        // Here we'll use our model to save the data.
        const sched = await Course.create(req.body);
        res.status(200).json(sched);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
 };

// Retrieve ALL records
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find ({});
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}

// Retrieve record where _id matches the supplied id
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById (req.params.id); // first occurance.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record that match a filter (in this case, a specific courseName)
const getFirstCourseByName = async (req, res) => {
    try {
        const course = await Course.findOne ({courseName:req.params.name}); // first occurance.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all record(s) that match a filter (in this case, a specific courseName)
const getAllCoursesByName = async (req, res) => {
    try {
        const course = await Course.find ({courseName:req.params.name}); // all occurances.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve record(s) that match a filter (in this case, a specific courseSection)
const getAllCoursesBySection = async (req, res) => {
    try {
        const course = await Course.find ({courseSection:req.params.section}); // all occurances.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records and update the content of each.
const updateAllCourses = async (req, res) => {
    try {
        const courses = await Course.updateMany ({}, req.body);
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve a record (by id) and update the content.
const updateCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate (req.params.id, req.body);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve first record (by name) and update the content.
const updateFirstCourseByName = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate ({courseName:req.params.name}, req.body);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Retrieve all records (by name) and update the content of each.
const updateAllCoursesByName = async (req, res) => {
    try {
        const courses = await Course.updateMany ({courseName:req.params.name}, req.body);
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
}; 
  
// Delete All records
const deleteAllCourses = async (req, res) => {
    try {
        const courses = await Course.deleteMany ({});
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

//Delete a record by Id
const deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete (req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete first record that match a filter (in this case, a specific courseName)
const deleteFirstCourseByName = async (req, res) => {
    try {
        const course = await Course.deleteOne ({courseName:req.params.name}); // first occurances.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Delete all records that match a filter (in this case, a specific courseName)
const deleteAllCoursesByName = async (req, res) => {
    try {
        const course = await Course.deleteMany ({courseName:req.params.name}); // first occurances.
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    getFirstCourseByName,
    getAllCoursesByName,
    getAllCoursesBySection,
    updateAllCourses,
    updateCourseById,
    updateFirstCourseByName,
    updateAllCoursesByName,
    deleteAllCourses,
    deleteCourseById,
    deleteFirstCourseByName,
    deleteAllCoursesByName  
};