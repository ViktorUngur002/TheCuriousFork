const { checkStringIsEmpty } = require("../utils");
const Order = require('../model/orderModel');
const OrderItem = require('../model/orderItemModel');

const handleNewOrder = async (req, res) => {
    const {customerName, customerEmail, customerPhoneNumber, customerAddress, customerAddressNumber} = req.body.formData;

    if(checkStringIsEmpty(customerName) || checkStringIsEmpty(customerEmail) || checkStringIsEmpty(customerPhoneNumber) || checkStringIsEmpty(customerAddress) || checkStringIsEmpty(customerAddressNumber)) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    let totalPrice = 0;

    try {

        const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                price: orderItem.price,
                title: orderItem.title
            });

            totalPrice += orderItem.quantity * orderItem.price;

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }));
        

        const orderItemsIdsResolved = await orderItemsIds;

        const newOrder = await Order.create({
            orderItemsIdsResolved,
            customerName,
            customerEmail,
            customerPhoneNumber,
            customerAddress,
            customerAddressNumber,
            totalPrice
        });

        if(newOrder) {
            res.status(200).json({
                _id:newOrder.id,
                success: 'New order made'
            });
        } else {
            res.status(400).json({ error: 'Invalid order data' });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { handleNewOrder }