const mongoose = require('mongoose');

const SessionSubSchema = mongoose.Schema ({
    day: {
        type: Number,
        required: true,
        default:1
    },
    startTime: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

const CourseSchema = mongoose.Schema ({
    courseName: {
        type:String,
        required: [true, "Please enter the course name"],
    },
    courseTitle: {
        type:String,
        required: [true, "Please enter the course title"],
    },
    courseSection: {
        type:Number,
        default: 1
    },
    sessions: {
        type:[SessionSubSchema]
    },
},
{ 
    timestamps: true
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;