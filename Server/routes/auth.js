// Imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const router = express.Router();

// Modelos
const Vendedor = require('../models/Vendedor');
const Cliente = require('../models/Cliente');
const upload = require('../config/multer');

// Função para determinar o modelo do usuário (vendedor ou cliente)
const getModelByType = (tipo) => {
    if (tipo === 'vendedor') {
        return Vendedor;
    } else if (tipo === 'cliente') {
        return Cliente;
    }
    throw new Error('Tipo de usuário inválido');
};

// Register
router.post('/register/:tipo', upload.single('image'), async (req, res) => {
    const { nome, email, senha, confirmasenha, telefone } = req.body;
    const { tipo } = req.params; // Obter o tipo (vendedor ou cliente)

    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }
    if (senha !== confirmasenha) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    const Model = getModelByType(tipo);

    // Checar se o usuário já existe
    const userExist = await Model.findOne({ email });
    if (userExist) {
        return res.status(422).json({ msg: 'E-mail já em uso' });
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    const imagemPerfil = req.file ? req.file.path : null;

    // Criar o novo usuário
    const user = new Model({
        nome,
        email,
        senha: passwordHash,
        imagemPerfil,
        telefone
    });

    try {
        await user.save();
        res.status(201).json({ msg: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} criado com sucesso!` });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// Login
router.post("/login/:tipo", async (req, res) => {
    const { email, senha } = req.body;
    const { tipo } = req.params; // Obter o tipo (vendedor ou cliente)

    if (!email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }

    const Model = getModelByType(tipo);

    // Checar se o usuário existe
    const user = await Model.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} não encontrado` });
    }

    // Checar a senha
    const checkPassword = await bcrypt.compare(senha, user.senha);
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Email ou Senha inválida' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);

        // Responder com token e dados do usuário
        res.status(200).json({
            msg: 'Autenticação realizada com sucesso',
            token,
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                imagemPerfil: user.imagemPerfil,
                telefone: user.telefone
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

module.exports = router;
