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

// Rota para criar um novo cliente
router.post("/",
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    ClienteController.postCliente);

// Rota para listar todos os clientes
router.get("/",
    validarExistencia,
    ClienteController.getAllClientes);

// Rota para buscar um cliente por ID
router.get('/:id',
    validarId,
    checkToken,
    validarPermissao,
    ClienteController.getOneCliente);

// Rota para atualizar um cliente
router.put('/:id',
    checkToken,
    validarExistenciaEspecifica,
    validarPermissao,
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    ClienteController.updateCliente);

// Rota para deletar um cliente
router.delete('/:id',
    checkToken,
    validarExistenciaEspecifica,
    validarPermissao,
    ClienteController.deleteCliente);

module.exports = router;
