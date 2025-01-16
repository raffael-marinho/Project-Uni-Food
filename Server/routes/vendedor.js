// routes/vendedor.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const VendedorController = require('../controllers/VendedorController');
const {
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    validarId,
    validarPermissao,
    validarExistenciaVendedor,
} = require('../middlewares/validacoes');

// Rota privada para pegar os detalhes do vendedor

router.post("/",
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    VendedorController.postVendedor);

router.get("/",
    validarExistenciaVendedor,
    VendedorController.getAllVendedor);

router.get('/:id',
    checkToken,
    validarExistenciaVendedor,
    validarId,
    validarPermissao,
    VendedorController.getOneVendedor);

router.put('/:id',
    checkToken,
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    validarId,
    validarPermissao,
    VendedorController.updateVendedor);

router.delete('/:id',
    checkToken,
    validarExistenciaVendedor,
    validarId,
    validarPermissao,
    VendedorController.deleteVendedor);


module.exports = router;
