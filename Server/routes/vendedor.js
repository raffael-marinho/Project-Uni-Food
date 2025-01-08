// routes/vendedor.js
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const Vendedor = require('../models/Vendedor');
const checkToken = require('../middlewares/authMiddleware');
const VendedorController = require('../controllers/VendedorController');

// Rota privada para pegar os detalhes do vendedor

router.post("/", VendedorController.postVendedor);

router.get('/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const vendedor = await Vendedor.findById(id, '-senha');
        if (!vendedor) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json(vendedor);
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

module.exports = router;
