const express = require('express');
const pictureRouter = require("./picture");
const authRouter = require('./auth');
const vendedorRouter = require('./vendedor');


const router = express.Router();

// Rota Pública
router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API' });
});

// Usar as outras rotas
router.use('/vendedor', vendedorRouter);    // Rota de vendedor
router.use('/pictures', pictureRouter);     // Rota de imagens
router.use('/auth', authRouter);            // Rota de autenticação


module.exports = router;