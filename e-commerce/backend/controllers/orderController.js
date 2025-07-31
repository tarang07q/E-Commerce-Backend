const Order = require('../models/Order');

//Create a New Order
const createOrder = async (req,res) => {
    try {
    const {userId, products,totalPrice} = req.body;

    const newOrder = newOrder ({
        userId,
        products,
        totalPrice,
        status: 'pending',
        orderId: Math.floor(Math.random()*1000000),
    })
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({message : 'Error creating the Order'});
    }
};

const getAllOrders = async (req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
        if(!order) {
            res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Error fetching the orders'});
    }
}

const getOrderById = async (req,res) => {
    try {
        const order = await Order.findById(req.params.id) 
        if(!order) {
            res.status(404).json({message: 'Order not Found'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Error fetching the Order'});
    }
};

const updateOrderStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new : true}
        );
        if(!order) {
            return res.status(404).json({message:'Order not found'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Error updating the order status'})
    }
};

const deleteOrder = async (req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id) 
        if(!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json({message: 'Order deleted successfully'});
    } catch(error) {
        res.status(500).json({message: 'Error deleting the order'});
    }
};

const calculateTotalRevenue = async (req,res) => {
    try {
        const orders = await Order.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice,0);
        res.status(200).json({totalRevenue});
    } catch (error) {
        res.status(500).json({message: 'Error fetching the revenue'});
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    calculateTotalRevenue,
}