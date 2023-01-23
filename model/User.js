const mongoose = require('mongoose');
const SCHEMA = mongoose.Schema;

// schema user
const userSchema = new SCHEMA({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

module.exports =  mongoose.model("User", userSchema);

// users 