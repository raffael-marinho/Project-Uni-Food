const Vendedor = require('../models/Vendedor');
const mongoose = require('mongoose');

// Validação de Dados Obrigatórios
const validarDadosObrigatorios = (req, res, next) => {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ msg: 'Nome, email, senha e telefone são obrigatórios.' });
    }

    next();
};

// Validação de Comprimento de Nome e Telefone
const validarComprimento = (req, res, next) => {
    const { nome, telefone } = req.body;

    if (nome.length < 5 || nome.length > 50) {
        return res.status(400).json({ msg: 'O nome deve ter entre 5 e 50 caracteres.' });
    }

    if (telefone.length < 10 || telefone.length > 15) {
        return res.status(400).json({ msg: 'O telefone deve ter entre 10 e 15 caracteres.' });
    }

    next();
};

// Validação de Domínio do Email
const validarDominioEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'O email deve ser válido e ter o domínio @gmail.com, @outlook.com ou @hotmail.com.' });
    }

    next();
};

// Validação de Email Único
const validarEmailUnico = async (req, res, next) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        if (email) {
            const vendedorExistente = await Vendedor.findOne({ email });
            if (vendedorExistente && vendedorExistente._id.toString() !== id) {
                return res.status(400).json({ msg: 'Este email já está em uso.' });
            }
        }
        next();
    } catch (error) {
        console.error('Erro ao verificar email no banco:', error.message);
        return res.status(500).json({ msg: 'Erro ao verificar o email.', error: error.message });
    }
};

// Validação de Formato da Senha
const validarFormatoSenha = (req, res, next) => {
    const { senha } = req.body;

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
        return res.status(400).json({
            msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.'
        });
    }

    next();
};

// Validação de ID
const validarId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido.' });
    }

    next();
};

// Validação de Permissão
const validarPermissao = (req, res, next) => {
    const { id } = req.params;

    if (req.user.id !== id) {
        return res.status(403).json({ msg: 'Permissão negada.' });
    }

    next();
};

// Validação de Existência do Vendedor
const validarExistenciaVendedor = async (req, res, next) => {
    try {
        const vendedores = await Vendedor.find().select('-senha');

        if (vendedores.length === 0) {
            return res.status(404).json({ msg: 'Nenhum vendedor encontrado.' });
        }

        next();
    } catch (error) {
        console.error('Erro ao buscar vendedor no banco:', error.message);
        return res.status(500).json({ msg: 'Erro ao verificar a existência do vendedor.', error: error.message });
    }
};

const validarExistenciaEspecifica = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const vendedor = await Vendedor.findById(id).select('-senha');

        if (!vendedor) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }
        req.vendedor = vendedor;

        next();
    } catch (error) {
        console.error('Erro ao verificar a existência do vendedor:', error.message);
        return res.status(500).json({ msg: 'Erro ao verificar a existência do vendedor.', error: error.message });
    }
};

// Validação de Relacionamentos do Vendedor
// const validarRelacionamentos = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const vendedor = await Vendedor.findById(id).populate('produtos');
//         if (vendedor && vendedor.produtos.length > 0) {
//             return res.status(400).json({
//                 msg: 'O vendedor possui produtos associados. Exclua ou reatribua os produtos antes de continuar.'
//             });
//         }

//         next();
//     } catch (error) {
//         console.error('Erro ao verificar relacionamentos:', error.message);
//         return res.status(500).json({ msg: 'Erro ao verificar relacionamentos.', error: error.message });
//     }
// };

// Exportar as funções
module.exports = {
    validarDadosObrigatorios,
    validarComprimento,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    validarId,
    validarPermissao,
    validarExistenciaVendedor,
    validarExistenciaEspecifica,
    // validarRelacionamentos,
};