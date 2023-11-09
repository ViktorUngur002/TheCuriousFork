const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerAddressNumber: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Order', orderSchema)