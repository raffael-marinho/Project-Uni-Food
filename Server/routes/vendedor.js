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
    validarExistenciaEspecifica,
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
    validarId,
    validarPermissao,
    VendedorController.getOneVendedor);

router.put('/:id',
    checkToken,
    validarExistenciaEspecifica,
    validarPermissao,
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    VendedorController.updateVendedor);

router.delete('/:id',
    checkToken,
    validarExistenciaVendedor,
    validarId,
    validarPermissao,
    VendedorController.deleteVendedor);


module.exports = router;
