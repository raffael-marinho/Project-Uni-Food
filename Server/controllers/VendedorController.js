const mongoose = require('mongoose');
const Vendedor = require('../models/Vendedor');

class VendedorController {
    async postVendedor(req, res) {
        const { nome, email, senha, telefone } = req.body;

        // Validação de Dados Obrigatórios
        if (!nome || !email || !senha || !telefone) {
            return res.status(400).json({ msg: 'Nome, email, senha e telefone são obrigatórios.' });
        }

        // Validação de comprimento de nome e telefone
        if (nome.length < 5 || nome.length > 50) {
            return res.status(400).json({ msg: 'O nome deve ter entre 5 e 50 caracteres.' });
        }

        if (telefone.length < 10 || telefone.length > 15) {
            return res.status(400).json({ msg: 'O telefone deve ter entre 10 e 15 caracteres.' });
        }

        // Regex para validar email com domínios específicos
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: 'O email deve ser válido e ter o domínio @gmail.com, @outlook.com ou @hotmail.com.' });
        }
        // Validação de Email Único
        const vendedorExistente = await Vendedor.findOne({ email });
        if (vendedorExistente) {
            return res.status(400).json({ msg: 'Este email já está em uso.' });
        }

        // Validação de Formato da Senha
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(senha)) {
            return res.status(400).json({
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.'
            });
        }
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

            if (req.user.id !== id) {
                return res.status(403).json({ msg: 'Você não tem permissão para acessar este vendedor.' });
            }

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

        // if (req.user._id !== id) {
        //     return res.status(403).json({ msg: 'Você não tem permissão para atualizar esse vendedor.' });
        // }

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

        // if (req.user._id !== id) {
        //     return res.status(403).json({ msg: 'Você não tem permissão para excluir este vendedor.' });
        // }

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