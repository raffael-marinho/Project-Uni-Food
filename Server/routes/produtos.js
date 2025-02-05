const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');

const ProdutoController = require('../controllers/ProdutoController');

const {
    validarExistenciaVendedorProduto,
    validarExistenciaDeProdutos,
    validarTiposDeDadosProduto,
    validarDadosObrigatoriosProduto,
    validarPermissaoProduto,
} = require('../middlewares/validacoes');

router.post('/',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    ProdutoController.postProduto);

router.get('/',
    validarExistenciaDeProdutos,
    ProdutoController.getAllProdutos);

router.get('/:id',
    validarExistenciaDeProdutos,
    ProdutoController.getOneProduto);

router.put('/:id',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    validarPermissaoProduto,
    ProdutoController.updateProduto);

router.delete('/:id',
    checkToken,
    validarExistenciaDeProdutos,
    validarPermissaoProduto,
    ProdutoController.deleteProduto);

module.exports = router;
