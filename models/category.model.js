const mongoose = require('mongoose');

const AvailabilitySubSchema = mongoose.Schema ({
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
    location: {
        type: String,
        required: true
    }
});

const CategorySchema = mongoose.Schema ({
    categoryCode: {
        type:String,
        required: [true, "Please enter the category code"],
    },
    categoryName: {
        type:String,
        required: [true, "Please enter the category name"],
    },
    categoryPriority: {
        type:Number,
        default: 1
    },
    availability: {
        type:[AvailabilitySubSchema]
    },
},
{ 
    timestamps: true
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;