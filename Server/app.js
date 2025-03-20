// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const pedidoRoutes = require('./routes/pedidos');



// Importar as rotas
const routes = require('./routes');


// Config JSON response
app.use(express.json());
const path = require('path');

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rotas para pedidos
app.use('/api', pedidoRoutes);

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));



// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// String de conexão com o MongoDB
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.qkzbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // 60 segundos
    socketTimeoutMS: 60000, // 60 segundos
})
.then(() => {
    console.log("Conectado ao banco!");
    app.use(routes);
    app.listen(3000, () => console.log('Servidor rodando na porta 3000!'));
})
.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
