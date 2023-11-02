const mongoose = require('mongoose');

const saladSchema = mongoose.Schema({
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
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Salad', saladSchema)