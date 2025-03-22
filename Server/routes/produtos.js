const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

const ProdutoController = require('../controllers/ProdutoController');

// Rota para criar um produto
router.post('/', checkToken, upload.single('file'),ProdutoController.postProduto);


// Rota para obter todos os produtos
router.get('/',
    ProdutoController.getAllProdutos);


// Rota para obter um produto por ID
router.get('/:id',
    ProdutoController.getOneProduto);


// Rota para atualizar um produto
router.put('/:produtoId', checkToken,ProdutoController.updateProduto);


// Rota para excluir um produto
router.delete('/:id',
    checkToken,ProdutoController.deleteProduto);

// Rota para obter todos os produtos de um vendedor
router.get('/vendedor/:id',
    checkToken,ProdutoController.getProdutosByVendedor);

module.exports = router;
