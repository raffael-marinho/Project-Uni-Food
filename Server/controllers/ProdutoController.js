const Produto = require('../models/Produto');

class ProdutoController {
    async postProduto(req, res) {
        try {
            const produto = new Produto(req.body);
            await produto.save();
            return res.status(201).json({ msg: 'Produto criado com sucesso.', produto });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar produto.', details: error.message });
        }
    }

    async getAllProdutos(req, res) {
        try {
            const produtos = await Produto.find().populate('vendedor', 'nome email');
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao recuperar produtos.', details: error.message });
        }
    }

    async getOneProduto(req, res) {
        try {
            const id = req.params.id;
            const produto = await Produto.findById(id).populate('vendedor', 'nome email');
            if (!produto) {
                return res.status(404).json({ msg: 'Produto não encontrado.' });
            }
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao recuperar o produto.', details: error.message });
        }
    }

    async updateProduto(req, res) {
        try {
            const id = req.params.id;
            const produto = await Produto.findById(id);
            if (!produto) {
                return res.status(404).json({ msg: 'Produto não encontrado.' });
            }
            Object.assign(produto, req.body);
            await produto.save();
            return res.status(200).json({ msg: 'Produto atualizado com sucesso.', produto });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o produto.', details: error.message });
        }
    }

    async deleteProduto(req, res) {
        try {
            const id = req.params.id;
            const produto = await Produto.findByIdAndDelete(id);
            if (!produto) {
                return res.status(404).json({ msg: 'Produto não encontrado.' });
            }
            return res.status(200).json({ msg: 'Produto deletado com sucesso.', produto });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o produto.', details: error.message });
        }
    }
}

module.exports = new ProdutoController();
