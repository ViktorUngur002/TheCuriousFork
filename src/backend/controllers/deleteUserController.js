const User = require('../model/userModel');
const Order = require('../model/orderModel');
const OrderItem = require('../model/orderItemModel');

const deleteUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            res.status(400).json({ error: "User not found!" });
        }

        console.log("im in delete function");

        const userOrders = await Order.find({ customerEmail: user.email });

        if(userOrders.length > 0) {
            await userOrders.map(async userOrder => {
                await userOrder.orderItems.map(async orderItem => {
                    const orderItemToRemove = await OrderItem.findByIdAndRemove(orderItem);
        
                    await orderItemToRemove.deleteOne();
                });

                await userOrder.deleteOne();
            });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted!" });
    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

module.exports = { deleteUser }