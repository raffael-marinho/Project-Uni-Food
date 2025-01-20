// routes/cliente.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');
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
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.postCliente);

router.get("/",
    validarExistencia('cliente'),
    ClienteController.getAllCliente);

router.get('/:id',
    validarId,
    checkToken,
    validarId,
    validarPermissao,
    ClienteController.getOneCliente);

router.put('/:id',
    checkToken,
    validarExistenciaEspecifica('cliente'),
    validarPermissao,
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.updateCliente);

router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica('cliente'),
    validarPermissao,
    ClienteController.deleteCliente);

module.exports = router;
