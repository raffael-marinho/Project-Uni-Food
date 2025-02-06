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

// Rota para criar um produto
router.post('/',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    ProdutoController.postProduto);


// Rota para obter todos os produtos
router.get('/',
    validarExistenciaDeProdutos,
    ProdutoController.getAllProdutos);


// Rota para obter um produto por ID
router.get('/:id',
    validarExistenciaDeProdutos,
    ProdutoController.getOneProduto);


// Rota para atualizar um produto
router.put('/:id',
    checkToken,
    validarExistenciaVendedorProduto,
    validarDadosObrigatoriosProduto,
    validarTiposDeDadosProduto,
    validarPermissaoProduto,
    ProdutoController.updateProduto);


// Rota para excluir um produto
router.delete('/:id',
    checkToken,
    validarExistenciaDeProdutos,
    validarPermissaoProduto,
    ProdutoController.deleteProduto);

module.exports = router;
