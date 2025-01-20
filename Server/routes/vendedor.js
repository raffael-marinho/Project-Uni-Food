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
    validarExistencia,
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
    validarExistencia('vendedor'),
    VendedorController.getAllVendedor);

router.get('/:id',
    validarId,
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
    validarExistenciaEspecifica,
    validarPermissao,
    VendedorController.deleteVendedor);


module.exports = router;
