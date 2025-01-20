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

// Rota para cadastrar um novo cliente
router.post("/",
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.postCliente);

// Rota para pegar todos os clientes
router.get("/",
    validarExistencia('cliente'),
    ClienteController.getAllCliente);

// Rota para pegar os detalhes de um cliente específico
router.get('/:id',
    validarId,
    checkToken,
    validarId,
    validarPermissao,
    ClienteController.getOneCliente);

// Rota para atualizar um cliente
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

// Rota para deletar um cliente
router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica('cliente'),
    validarPermissao,
    ClienteController.deleteCliente);

module.exports = router;
