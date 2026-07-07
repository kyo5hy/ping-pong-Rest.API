const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
// NOVA ROTA PARA ATUALIZAR STATUS
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;