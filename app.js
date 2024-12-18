// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const multer = require('multer');

// Config JSON response
app.use(express.json());
const path = require('path');

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Modelos
const User = require('./models/Vendedor');
const upload = require('./config/multer');


// Rota Pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API' });
});

// Rota Privada
app.get("/vendedor/:id", checkToken, async(req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
}

// Rotas de Picture
const pictureRouter = require("./routes/picture");
const Vendedor = require('./models/Vendedor');
app.use("/pictures", pictureRouter);

// Register do Vendedor
app.post('/auth/register', upload.single('image'), async (req, res) => {
    const { nome, email, senha, confirmasenha, telefone } = req.body;

    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }
    if (senha !== confirmasenha) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    // Checar se o vendedor já existe
    const vendedorExist = await User.findOne({ email });
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
app.post("/auth/login", async (req, res) => {
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

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.qkzbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao banco!');
        });
    })
    .catch((err) => console.log(err));
