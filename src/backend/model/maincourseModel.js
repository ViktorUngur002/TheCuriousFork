const mongoose = require('mongoose');

const maincourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
    },

    description: {
        type: String,
        required: [true, 'Please add a description'],
    },

    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },

    image: {
        type: Buffer,
        required: [true, 'Please add an image'],
    },

    section: {
        type: String,
        required: [true, 'Please add the meal type'],
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('MainCourse', maincourseSchema)