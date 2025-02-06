// routes/vendedor.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const VendedorController = require('../controllers/VendedorController');
const {
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    validarExistencia,
} = require('../middlewares/validacoes');


// Rota para criar um vendedor
router.post("/",
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
    validarFormatoSenha,
    VendedorController.postVendedor);


// Rota para obter todos os vendedores
router.get("/",
    validarExistencia('vendedor'),
    VendedorController.getAllVendedor);


// Rota para obter um vendedor por ID
router.get('/:id',
    checkToken,
    VendedorController.getOneVendedor);


// Rota para atualizar um vendedor
router.put('/:id',
    checkToken,
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
    validarFormatoSenha,
    VendedorController.updateVendedor);


// Rota para deletar um vendedor
router.delete('/:id',
    checkToken,
    VendedorController.deleteVendedor);


module.exports = router;
