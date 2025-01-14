const Vendedor = require('../models/Vendedor');
const mongoose = require('mongoose');

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
    }

    async updateVendedor(req, res) {
        try {
            const { id } = req.params;
            const updated = await Vendedor.findByIdAndUpdate(id, req.body, { new: true });

            if (!updated) {
                return res.status(404).json({ message: "Vendedor não encontrado para atualização." });
            }

            return res.status(200).json({ message: "Vendedor atualizado com sucesso.", updated });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar Vendedor.", details: error.message });
        }
    }

    async deleteVendedor(req, res) {
        try {
            const { id } = req.params;
            const deletePorId = await Vendedor.findByIdAndDelete(id, req.body, { new: true });

            if (!deletePorId) {
                return res.status(404).json({ message: "Vendedor não encontrado para ser deletado." });
            }

            return res.status(200).json({ message: "Vendedor deletado com sucesso.", deletePorId });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar Vendedor.", details: error.message });
        }
    }
}

module.exports = new VendedorController();