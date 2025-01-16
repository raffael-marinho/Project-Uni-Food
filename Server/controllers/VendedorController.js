const mongoose = require('mongoose');
const Vendedor = require('../models/Vendedor');

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

            return res.status(200).json(vendedores);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao recuperar vendedores.' });
        }
    }

    async getOneVendedor(req, res) {
        try {
            const id = req.params.id;
            const vendedor = await Vendedor.findById(id, '-senha');

            res.status(200).json(vendedor);
        } catch (error) {
            res.status(500).json({ msg: 'Erro no servidor' });
        }
    }

    async updateVendedor(req, res) {
        try {
            const id = req.params.id;
            const vendedor = await Vendedor.findById(id);
            Object.assign(vendedor, req.body);
            await vendedor.save();
            return res.status(200).json({ msg: 'Vendedor atualizado com sucesso.', vendedor });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o vendedor.', details: error.message });
        }
    }

    async deleteVendedor(req, res) {
        try {
            // const vendedor = await Vendedor.findByIdAndDelete(id);

            // if (!vendedor) {
            //     return res.status(404).json({ msg: 'Usuário não encontrado para ser deletado.' });
            // }

            return res.status(200).json({ msg: 'Vendedor deletado com sucesso.', vendedor });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o vendedor.', details: error.message });
        }
    }
}

module.exports = new VendedorController();