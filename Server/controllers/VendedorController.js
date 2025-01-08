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

    async getAllVendedor(req, res) {
        try {
            const vendedores = await Vendedor.find();

            if (vendedores.length === 0) {
                return res.status(404).json({ msg: 'Nenhum vendedor encontrado.' });
            }

            return res.status(200).json(vendedores);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao recuperar vendedores.' });
        }
    }

    async getOneVendedor(req, res) {
        const id = req.params.id;

        try {
            const vendedor = await Vendedor.findById(id);
            if (!vendedor) {
                return res.status(404).json({ msg: 'Vendedor não encontrado.' });
            }
            return res.status(200).json(vendedor);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar vendedor." });
        }
    }

    async updateVendedor() {

    }

    async deleteVendedor() {

    }
}

module.exports = new VendedorController();