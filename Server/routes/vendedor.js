// routes/vendedor.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const VendedorController = require('../controllers/VendedorController');



// Rota para obter todos os vendedores
router.get("/",VendedorController.getAllVendedor);


// Rota para obter um vendedor por ID
router.get('/:id',
    checkToken,
    VendedorController.getOneVendedor);


// Rota para atualizar um vendedor
router.put('/:id',
    checkToken,VendedorController.updateVendedor);


// Rota para deletar um vendedor
router.delete('/:id',
    checkToken,
    VendedorController.deleteVendedor);


module.exports = router;
