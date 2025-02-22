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


// Rota para criar um cliente
router.post("/",
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico('cliente'),
    validarFormatoSenha,
    ClienteController.postCliente);


// Rota para obter todos os clientes
router.get("/",
    validarExistencia('cliente'),
    ClienteController.getAllClientes);


// Rota para obter um cliente por ID
router.get('/:id',
    checkToken,
    ClienteController.getOneCliente);


// Rota para atualizar um cliente
router.put('/:id',
    checkToken,
    ClienteController.updateCliente);


// Rota para deletar um cliente
router.delete('/:id',
    checkToken,
    ClienteController.deleteCliente);

module.exports = router;
