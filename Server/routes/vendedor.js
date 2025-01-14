// routes/vendedor.js

const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/authMiddleware');
const VendedorController = require('../controllers/VendedorController');

// Rota privada para pegar os detalhes do vendedor

router.post("/", VendedorController.postVendedor);

router.get("/", VendedorController.getAllVendedor);

router.get('/:id', checkToken, VendedorController.getOneVendedor);

router.put('/:id', checkToken, VendedorController.updateVendedor);

router.delete('/:id', checkToken, VendedorController.deleteVendedor);


module.exports = router;
