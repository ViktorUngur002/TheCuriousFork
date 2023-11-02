const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please add a password']
    },

    phoneNumber: {
        type: String,
        required: [true, 'Please add phone number']
    },

    birthdayDate: {
        type: Date,
        required: [true, 'Please add birthday date']
    },

    gender: {
        type: String,
        required: [true, 'Please set your gender'],
        enum: ['male', 'female'],
    },

    address: {
        type: String,
        required: [true, 'Please set an address']
    },

    addressNumber: {
        type: Number,
        integer: true,
        required: [true, 'Please set an address number']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)