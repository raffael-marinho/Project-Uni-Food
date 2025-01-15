const Vendedor = require('../models/Vendedor');

class Validacao {
    // Validação de Dados Obrigatórios
    static validarDadosObrigatorios(req, res, next) {
        const { nome, email, senha, telefone } = req.body;

        if (!nome || !email || !senha || !telefone) {
            return res.status(400).json({ msg: 'Nome, email, senha e telefone são obrigatórios.' });
        }

        next();
    }

    // Validação de comprimento de nome e telefone
    static validarComprimento(req, res, next) {
        const { nome, telefone } = req.body;

        if (nome.length < 5 || nome.length > 50) {
            return res.status(400).json({ msg: 'O nome deve ter entre 5 e 50 caracteres.' });
        }

        if (telefone.length < 10 || telefone.length > 15) {
            return res.status(400).json({ msg: 'O telefone deve ter entre 10 e 15 caracteres.' });
        }

        next();
    }

    // Validação de Email Único
    static async validarEmailUnico(req, res, next) {
        const { email } = req.body;

        try {
            const vendedorExistente = await Vendedor.findOne({ email });
            if (vendedorExistente) {
                return res.status(400).json({ msg: 'Este email já está em uso.' });
            }
            next();
        } catch (error) {
            return res.status(500).json({ msg: 'Erro ao verificar o email.', error });
        }
    }

    // Validação de Formato da Senha
    static validarFormatoSenha(req, res, next) {
        const { senha } = req.body;

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(senha)) {
            return res.status(400).json({
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.'
            });
        }

        next();
    }
}

module.exports = Validacao;