const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const user = mongoose.model('user' , userSchema);
module.exports = user;
// we have to store time stamp for created at and updated at