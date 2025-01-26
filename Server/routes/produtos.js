const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.post('/', ProdutoController.postProduto);
router.get('/', ProdutoController.getAllProdutos);
router.get('/:id', ProdutoController.getOneProduto);
router.put('/:id', ProdutoController.updateProduto);
router.delete('/:id', ProdutoController.deleteProduto);

module.exports = router;
