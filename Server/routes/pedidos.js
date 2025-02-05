const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rota para fazer um pedido
router.post('/pedidos', pedidoController.fazerPedido);

module.exports = router;
