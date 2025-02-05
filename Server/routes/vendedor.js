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

router.post("/",
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
    validarFormatoSenha,
    VendedorController.postVendedor);

router.get("/",
    validarExistencia('vendedor'),
    VendedorController.getAllVendedor);

router.get('/:id',
    checkToken,
    VendedorController.getOneVendedor);

router.put('/:id',
    checkToken,
    validarExistenciaEspecifica('vendedor'),
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('vendedor'),
    validarFormatoSenha,
    VendedorController.updateVendedor);

router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica('vendedor'),
    VendedorController.deleteVendedor);


module.exports = router;
