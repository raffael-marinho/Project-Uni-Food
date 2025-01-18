const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Esquema do Cliente
const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  endereco: {
    rua: String,
    numero: String,
    cidade: String,
    estado: String,
    cep: String,
  },
  imagemPerfil: {
    type: String, // Caminho ou URL da imagem
    default: '',  
  },
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido', // Relaciona os pedidos ao cliente
  }],
}, { timestamps: true });

// Hash da senha antes de salvar
clienteSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Comparar senha
clienteSchema.methods.comparePassword = function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Cliente', clienteSchema);
