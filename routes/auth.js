// Imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const router = express.Router();

// Modelos
const Vendedor = require('../models/Vendedor');
const upload = require('../config/multer');



// Register do Vendedor
router.post('/register', upload.single('image'), async (req, res) => {
    const { nome, email, senha, confirmasenha, telefone } = req.body;

    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }
    if (senha !== confirmasenha) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    // Checar se o vendedor já existe
    const vendedorExist = await Vendedor.findOne({ email });
    if (vendedorExist) {
        return res.status(422).json({ msg: 'E-mail já em uso' });
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    const imagemPerfil = req.file ? req.file.path : null;

    // Criar usuário de vendedor
    const vendedor = new Vendedor({
        nome,
        email,
        senha: passwordHash,
        imagemPerfil,
        telefone
    });

    try {
        await vendedor.save();
        res.status(201).json({ msg: 'Usuário de vendedor criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

// Login usuario de vendedor
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }

    // Checar se o usuário de vendedor existe
    const vendedor = await Vendedor.findOne({ email });
    if (!vendedor) {
        return res.status(404).json({ msg: 'Usuário de vendedor não encontrado' });
    }

    // Checar a senha
    const checkPassword = await bcrypt.compare(senha, vendedor.senha);
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Email ou Senha inválida' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: vendedor._id }, secret);

        // Responder com token e dados do usuário
        res.status(200).json({ 
            msg: 'Autenticação realizada com sucesso', 
            token,
            vendedor: {
                id: vendedor._id,
                name: vendedor.name,
                email: vendedor.email,
                imagemPerfil: vendedor.imagemPerfil,
                telefone: vendedor.telefone
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

module.exports = router;