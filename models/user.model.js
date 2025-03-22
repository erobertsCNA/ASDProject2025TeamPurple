const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    userId:              { type: Number, required:true }, 
    firstName:           { type: String, required:true }, 
    lastName:            { type: String, required:true }, 
    dob:                 { type: Date,   required:true }, 
    addressUnit:         { type: Number, required:true }, 
    addressStreet:       { type: String, required:true }, 
    addressCity:         { type: String, required:true }, 
    addressStateProv:    { type: String, required:true },
    addressCountry:      { type: String, required:true },
    addressPostCode:     { type: String, required:true },
    phone:               { type: String, required:true },
    email:               { type: String, required:true },
    emergContactName:    { type: String, required:true },
    emergContactPhone:   { type: String, required:true },
    emergContactRel:     { type: String, required:true },
    userRole:            { type: String, required:true }
},
{ 
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;