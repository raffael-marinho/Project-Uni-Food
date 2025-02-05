// routes/cliente.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');
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
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.postCliente);

router.get("/",
    validarExistencia('cliente'),
    ClienteController.getAllClientes);

router.get('/:id',
    checkToken,
    ClienteController.getOneCliente);

router.put('/:id',
    checkToken,
    validarExistenciaEspecifica('cliente'),
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.updateCliente);

router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica('cliente'),
    ClienteController.deleteCliente);

module.exports = router;
