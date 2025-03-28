const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password:            { type: String, required:true },
    emergContactName:    { type: String, required:true },
    emergContactPhone:   { type: String, required:true },
    emergContactRel:     { type: String, required:true },
    userRole:            { type: String, required:true }
    },
{timestamps: true}
);

//Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//Compared entered and hashed password
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;