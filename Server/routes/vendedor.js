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

router.post("/",
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
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
    validarExistenciaEspecifica('vendedor'),
    validarPermissao,
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
    validarFormatoSenha,
    VendedorController.updateVendedor);

router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica('vendedor'),
    validarPermissao,
    VendedorController.deleteVendedor);


module.exports = router;
