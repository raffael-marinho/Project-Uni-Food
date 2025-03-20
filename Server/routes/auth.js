// Imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { getAuth,sendPasswordResetEmail } = require("firebase-admin/auth");
const axios = require("axios");
require("dotenv").config();
const nodemailer = require('nodemailer');
const enviarEmail = require('../config/emailService');



const bucket = require('../config/firebaseConfig');

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

const admin = require('firebase-admin'); // Firebase Admin SDK


router.post('/register/:tipo', upload.fields([{ name: 'imagemPerfil' }, { name: 'imagemCapa' }]), async (req, res) => {
    const { nome, email, senha, confirmasenha, telefone, chavePix } = req.body;
    const { tipo } = req.params; // Tipo: vendedor ou cliente

    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }
    if (senha !== confirmasenha) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    const Model = getModelByType(tipo);

    try {
        // Criar usuário no Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password: senha,
            displayName: nome,
        });

        console.log("Usuário criado no Firebase:", userRecord.uid);

        let imagemPerfilUrl = null;
        let imagemCapaUrl = null;

        // Função para fazer upload da imagem no Firebase Storage
        const uploadImagem = async (file, folder) => {
            try {
                const fileName = `${folder}/${tipo}_${Date.now()}_${file.originalname}`;
                const firebaseFile = bucket.file(fileName);
                const stream = firebaseFile.createWriteStream({ metadata: { contentType: file.mimetype } });

                await new Promise((resolve, reject) => {
                    stream.on("error", reject);
                    stream.on("finish", async () => {
                        await firebaseFile.makePublic();
                        resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
                    });

                    stream.end(file.buffer);
                });

                return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            } catch (error) {
                console.error(`Erro ao fazer upload da ${folder}:`, error);
                throw new Error(`Erro ao fazer upload da ${folder}.`);
            }
        };

        let dadosUsuario = {
            firebaseUID: userRecord.uid,
            nome,
            email,
            telefone
        };

        // Apenas vendedores podem enviar imagens e chave Pix
        if (tipo === 'vendedor') {
            if (req.files.imagemPerfil) {
                imagemPerfilUrl = await uploadImagem(req.files.imagemPerfil[0], 'perfil');
            }
            if (req.files.imagemCapa) {
                imagemCapaUrl = await uploadImagem(req.files.imagemCapa[0], 'capa');
            }

            // Adicionar imagens e chave Pix ao objeto do vendedor
            dadosUsuario.imagemPerfil = imagemPerfilUrl;
            dadosUsuario.imagemCapa = imagemCapaUrl;
            if (chavePix) {
                dadosUsuario.chavePix = chavePix;
            }
        }

        // Criar usuário no MongoDB
        const user = new Model(dadosUsuario);
        await user.save();

        res.status(201).json({
            msg: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} criado com sucesso!`,
            user
        });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ msg: 'Erro no servidor', error });
    }
});


module.exports = router;



// Login
router.post("/login/:tipo", async (req, res) => {
    const { email, senha } = req.body;
    const { tipo } = req.params; // "vendedor" ou "cliente"

    if (!email || !senha) {
        return res.status(422).json({ msg: "Campos obrigatórios" });
    }

    try {
        // 🔹 Fazer login no Firebase via API REST
        const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

        const { data } = await axios.post(firebaseAuthUrl, {
            email,
            password: senha,
            returnSecureToken: true,
        });

        // 🔹 Buscar o usuário no Firebase
        const userRecord = await admin.auth().getUser(data.localId);

        // 🔹 Obter o modelo correto (Cliente ou Vendedor)
        const Model = getModelByType(tipo);

        // 🔹 Buscar usuário no MongoDB usando o UID do Firebase
        const user = await Model.findOne({ firebaseUID: userRecord.uid });
        if (!user) {
            return res.status(404).json({ msg: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} não encontrado no banco de dados` });
        }

        // 🔹 Criar token JWT no backend
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: userRecord.uid }, secret, { expiresIn: "7d" });

        res.status(200).json({
            msg: "Autenticação realizada com sucesso",
            token,
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                imagemPerfil: user.imagemPerfil,
                telefone: user.telefone,
                descricao: user.descricao,
                chavePix: user.chavePix,
                imagemCapa: user.imagemCapa,
                status: user.status,
            },
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        return res.status(401).json({ msg: "Email ou senha inválidos" });
    }
});


// função de fazer uma redefinição de senha
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "O e-mail é obrigatório" });
    }

    try {
        // Gera um link para redefinição de senha
        const resetLink = await admin.auth().generatePasswordResetLink(email);



        // Envia o link para o e-mail do usuário usando o nodemailer
        const mensagem = `<p>Olá, clique no link abaixo para redefinir sua senha:</p><p><a href="${resetLink}">${resetLink}</a></p>`;
        enviarEmail(email, "Redefinição de Senha", mensagem);


        res.status(200).json({
            msg: "Link para redefinição de senha gerado com sucesso",
            link: resetLink
        });

    } catch (error) {
        console.error("Erro ao enviar redefinição de senha:", error);
        res.status(500).json({ msg: "Erro ao processar a solicitação", error: error.message });
    }
});

router.post("/send-verification-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "O e-mail é obrigatório" });
    }

    try {
        // Obtém o usuário pelo e-mail
        const userRecord = await admin.auth().getUserByEmail(email);

        // Gera um link para verificação de e-mail
        const verifyLink = await admin.auth().generateEmailVerificationLink(email);

        res.status(200).json({
            msg: "E-mail de verificação enviado",
            link: verifyLink
        });

    } catch (error) {
        console.error("Erro ao enviar e-mail de verificação:", error);
        res.status(500).json({ msg: "Erro ao processar a solicitação" });
    }
});
module.exports = router;
