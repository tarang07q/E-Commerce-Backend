const express = require ('express');

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    calculateTotalRevenue,
} = require('../controllers/orderController');

const router = express.Router();

router.put('/',createOrder);
router.get('/',getAllOrders);
router.get('/:id',getOrderById );
router.put('/:id',updateOrderStatus,);
router.delete('/:id',deleteOrder);
router.get('/revenue',calculateTotalRevenue);



module.exports = router;