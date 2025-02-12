const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rota para fazer um pedido
router.post('/', pedidoController.fazerPedido);

// Rota para o vendedor atualizar o status do pedido
router.put('/:pedidoId/status', pedidoController.atualizarStatusPedido);

// Rota para listar os pedidos de um cliente
router.get('/cliente/:clienteId', pedidoController.listarPedidosCliente);

// Rota para listar os pedidos de um vendedor
router.get('/vendedor/:vendedorId', pedidoController.listarPedidosVendedor);

// Rota para cliente cancelar o pedido antes dele ser aceito
router.put('/:pedidoId/cancelar', pedidoController.cancelarPedido);


module.exports = router;
