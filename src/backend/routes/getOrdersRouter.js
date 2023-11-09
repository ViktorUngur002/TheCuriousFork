const express = require('express');
const router = express.Router();
const Order = require('../model/orderModel');

router.get('/userOrders/:email', async (req, res) => {
    const email = req.params.email;
    
    try{
        const orderList = await Order.find({customerEmail: email}).populate('orderItems').sort({ 'dateOrdered':-1 });
        if(orderList) {
            res.status(200).json(orderList);
        } else {
            res.status(400).json({ message: 'No data found!' });
        }
    } catch(error) {
        res.status(500).json({ error:error });
    }

})

module.exports = router;