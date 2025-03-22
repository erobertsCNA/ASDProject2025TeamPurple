const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema ({
    orgName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    orgFoundedDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    orgType: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    orgServices: {
        type:[mongoose.Schema.Types.ObjectId], ref: 'Service'
    }
},
{ 
    timestamps: true
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;