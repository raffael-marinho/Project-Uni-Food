const Vendedor = require('../models/Vendedor');
const Cliente = require('../models/Cliente');
const Produto = require("../models/Produto");

const mongoose = require('mongoose');

// Validação de Dados Obrigatórios
const validarDadosObrigatorios = (req, res, next) => {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ msg: 'Nome, email, senha e telefone são obrigatórios.' });
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
const validarEmailUnico = (tipo) => {
    return async (req, res, next) => {
        const { email } = req.body;
        const { id } = req.params;

        try {
            if (email) {
                if (tipo === 'vendedor') {
                    const vendedorExistente = await Vendedor.findOne({ email });
                    if (vendedorExistente && vendedorExistente._id.toString() !== id) {
                        return res.status(400).json({ msg: 'Este email já está em uso por outro vendedor.' });
                    }
                }
                else if (tipo === 'cliente') {
                    const clienteExistente = await Cliente.findOne({ email });
                    if (clienteExistente && clienteExistente._id.toString() !== id) {
                        return res.status(400).json({ msg: 'Este email já está em uso por outro cliente.' });
                    }
                } else {
                    return res.status(400).json({ msg: 'Tipo inválido especificado na validação.' });
                }
            }
            next();  // Passa para o próximo middleware ou controlador
        } catch (error) {
            console.error(`Erro ao verificar email no banco:`, error.message);
            return res.status(500).json({ msg: 'Erro ao verificar o email.', error: error.message });
        }
    };
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



// Validação de Existência do Vendedor e cliente
const validarExistencia = (tipo) => {
    return async (req, res, next) => {
        try {
            if (tipo === 'vendedor') {
                const vendedorExiste = await Vendedor.exists({});
                if (!vendedorExiste) {
                    return res.status(404).json({ msg: 'Nenhum vendedor encontrado.' });
                }
            } else if (tipo === 'cliente') {
                const clienteExiste = await Cliente.exists({});
                if (!clienteExiste) {
                    return res.status(404).json({ msg: 'Nenhum cliente encontrado.' });
                }
            } else {
                return res.status(400).json({ msg: 'Tipo inválido especificado na validação.' });
            }

            next();
        } catch (error) {
            console.error(`Erro ao verificar existência de ${tipo} no banco:`, error.message);
            return res.status(500).json({ msg: `Erro ao verificar existência de ${tipo}.`, error: error.message });
        }
    };
};




// Validação de Dados Obrigatórios para Produtos
const validarDadosObrigatoriosProduto = (req, res, next) => {
    const { nome, descricao, preco, vendedor } = req.body;

    if (!nome || !descricao || preco == null || !vendedor) {
        return res.status(400).json({ msg: 'Os campos nome, descrição, preço e vendedor são obrigatórios.' });
    }

    next();
};

// Validação de Tipos de Dados
const validarTiposDeDadosProduto = (req, res, next) => {
    const { nome, descricao, preco, vendedor } = req.body;

    if (typeof nome !== 'string' || typeof descricao !== 'string') {
        return res.status(400).json({ msg: 'Os campos nome e descrição devem ser strings.' });
    }

    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({ msg: 'O preço deve ser um número positivo.' });
    }

    if (!mongoose.Types.ObjectId.isValid(vendedor)) {
        return res.status(400).json({ msg: 'O ID do vendedor deve ser um ObjectId válido.' });
    }

    next();
};



// Validação: Verifica se existem produtos
const validarExistenciaDeProdutos = async (req, res, next) => {
    try {
        const produtos = await Produto.find();
        if (produtos.length === 0) {
            return res.status(404).json({ msg: 'Nenhum produto encontrado.' });
        }
        req.produtos = produtos;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao validar a existência de produtos.', details: error.message });
    }
};



// Validação da Existência do Vendedor - (pode ser melhorada com a validação espeficica)
const validarExistenciaVendedorProduto = async (req, res, next) => {
    const { vendedor } = req.body;

    try {
        const vendedorExistente = await Vendedor.findById(vendedor);
        if (!vendedorExistente) {
            return res.status(404).json({ msg: 'O vendedor fornecido não existe.' });
        }

        next();
    } catch (error) {
        console.error('Erro ao validar o vendedor:', error.message);
        return res.status(500).json({ msg: 'Erro ao validar o vendedor.', error: error.message });
    }
};

//Verificar se o vendedor autenticado é o dono do produto
const validarPermissaoProduto = async (req, res, next) => {
    const { id } = req.params;
    const vendedorAutenticado = req.user;

    try {
        const produto = await Produto.findById(id);

        if (produto.vendedor.toString() !== vendedorAutenticado.id.toString()) {
            return res.status(403).json({ msg: 'Você não tem permissão para excluir este produto.' });
        }

        req.produto = produto;
        next();
    } catch (error) {

        return res.status(500).json({ msg: 'Erro interno ao validar permissão.', error: error.message });
    }
};

module.exports = {
    validarDadosObrigatorios,
    validarDominioEmail,
    validarEmailUnico,
    validarFormatoSenha,
    validarExistencia,
    validarExistenciaDeProdutos,
    validarTiposDeDadosProduto,
    validarDadosObrigatoriosProduto,
    validarExistenciaVendedorProduto,
    validarPermissaoProduto
};