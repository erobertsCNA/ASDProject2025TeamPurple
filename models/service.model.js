const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema ({
    serviceName: {
        type:String,
        required: [true, "Please enter the service name"],
    },
    serviceCategory: {
        type:String,
        required: [true, "Please enter the service category"],
    },
    serviceStartDate: {
        type:Date,
    },
    serviceProviders: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Organization'
    }
},
{ 
    timestamps: true
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;