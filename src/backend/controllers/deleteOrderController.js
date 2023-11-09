const Order = require('../model/orderModel');
const OrderItem = require('../model/orderItemModel');

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order) {
            res.status(400).json({ error: "Order not found!" });
        }

        await order.orderItems.map(async orderItem => {
            const orderItemToRemove = await OrderItem.findByIdAndRemove(orderItem);

            await orderItemToRemove.deleteOne();
        })

        await order.deleteOne();

        res.status(200).json({ message: "Order deleted!" });
    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

module.exports = { deleteOrder }