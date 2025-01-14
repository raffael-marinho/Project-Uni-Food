const Vendedor = require('../models/Vendedor');
const mongoose = require('mongoose');

class VendedorController {
    async postVendedor(req, res) {
        try {
            const vendedor = new Vendedor(req.body);
            await vendedor.save();

            const { senha, ...vendedorSemSenha } = vendedor.toObject();
            return res.status(201).json(vendedorSemSenha);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar vendedor." });
        }
    }

    async getAllVendedor(req, res) {
        try {
            const vendedores = await Vendedor.find().select('-senha');

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
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        try {
            const vendedor = await Vendedor.findById(id);
            if (!vendedor) {
                return res.status(404).json({ msg: 'Usuário não encontrado.' });
            }

            Object.assign(vendedor, req.body);

            await vendedor.save();

            return res.status(200).json({ msg: 'Vendedor atualizado com sucesso.', vendedor });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o vendedor.', details: error.message });
        }
    }

    async deleteVendedor(req, res) {
        const id = req.params.id;

        if (req.user._id !== id) {
            return res.status(403).json({ msg: 'Você não tem permissão para excluir este vendedor.' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        try {
            const vendedor = await Vendedor.findByIdAndDelete(id);

            if (!vendedor) {
                return res.status(404).json({ msg: 'Usuário não encontrado para ser deletado.' });
            }

            return res.status(200).json({ msg: 'Vendedor deletado com sucesso.', vendedor });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o vendedor.', details: error.message });
        }
    }
}

module.exports = new VendedorController();