const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');

const ProdutoController = require('../controllers/ProdutoController');

const {
    validarExistenciaVendedorProduto,
    validarExistenciaDeProdutos,
    validarProdutoPorId,
    validarTiposDeDadosProduto,
    validarDadosObrigatoriosProduto,
    validarFormatoPrecoProduto,
    validarPermissaoProduto,
} = require('../middlewares/validacoes');

router.post('/',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    validarFormatoPrecoProduto,
    ProdutoController.postProduto);

router.get('/',
    validarExistenciaDeProdutos,
    ProdutoController.getAllProdutos);

router.get('/:id',
    validarExistenciaDeProdutos,
    validarProdutoPorId,
    ProdutoController.getOneProduto);

router.put('/:id',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    validarFormatoPrecoProduto,
    ProdutoController.updateProduto);

router.delete('/:id',
    checkToken,
    validarProdutoPorId,
    validarExistenciaDeProdutos,
    validarPermissaoProduto,
    ProdutoController.deleteProduto);

module.exports = router;
