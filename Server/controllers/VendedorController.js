const Vendedor = require('../models/Vendedor');

class VendedorController {
    async postVendedor(req, res) {
        try {
            const createdVendedor = await Vendedor.create(req.body);
            return res.status(201).json(createdVendedor);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar vendedor." });
        }
    }

    async getAllVendedor() {

    }

    async getOneVendedor() {

    }

    async updateVendedor() {

    }

    async deleteVendedor() {

    }
}

module.exports = new VendedorController();