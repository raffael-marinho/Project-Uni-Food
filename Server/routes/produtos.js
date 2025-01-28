const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

const { validarExistenciaDeProdutos,
    validarProdutoPorId,
    validarTiposDeDadosProduto,
    validarDadosObrigatoriosProduto,
} = require('../middlewares/validacoes');

router.post('/', validarDadosObrigatoriosProduto, validarTiposDeDadosProduto, ProdutoController.postProduto);

router.get('/', ProdutoController.getAllProdutos);

router.get('/:id', ProdutoController.getOneProduto);

router.put('/:id', ProdutoController.updateProduto);

router.delete('/:id', ProdutoController.deleteProduto);

module.exports = router;
