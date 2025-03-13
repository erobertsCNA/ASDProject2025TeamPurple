const express = require("express");
const courseRouter = express.Router (); // this router will be our interface
const {
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
} = require ("../controllers/course.controller.js");

courseRouter.post ('/', createCourse);
courseRouter.get ('/', getAllCourses);
courseRouter.get ('/id=:id', getCourseById);
courseRouter.get ('/name=:name', getFirstCourseByName);
courseRouter.get ('/names=:name', getAllCoursesByName);
courseRouter.get ('/section=:section', getAllCoursesBySection);
courseRouter.put ('/', updateAllCourses);
courseRouter.put ('/id=:id', updateCourseById);
courseRouter.put ('/name=:name', updateFirstCourseByName);
courseRouter.put ('/names=:name', updateAllCoursesByName);
courseRouter.delete ('/', deleteAllCourses);
courseRouter.delete ('/id=:id', deleteCourseById);
courseRouter.delete ('/name=:name', deleteFirstCourseByName);
courseRouter.delete ('/names=:name', deleteAllCoursesByName);

module.exports = courseRouter;