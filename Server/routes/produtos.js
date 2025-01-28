const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');

const ProdutoController = require('../controllers/ProdutoController');

const {
    validarExistenciaDeProdutos,
    validarProdutoPorId,
    validarTiposDeDadosProduto,
    validarDadosObrigatoriosProduto,
    validarFormatoPrecoProduto,
} = require('../middlewares/validacoes');

router.post('/',
    checkToken,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    validarFormatoPrecoProduto,
    ProdutoController.postProduto);

router.get('/',
    validarExistenciaDeProdutos,
    validarProdutoPorId,
    ProdutoController.getAllProdutos);

router.get('/:id',
    validarExistenciaDeProdutos,
    validarProdutoPorId,
    ProdutoController.getOneProduto);

router.put('/:id', ProdutoController.updateProduto);

router.delete('/:id',
    checkToken,
    validarProdutoPorId,
    validarExistenciaDeProdutos,
    ProdutoController.deleteProduto);

module.exports = router;
