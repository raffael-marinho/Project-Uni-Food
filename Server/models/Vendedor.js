const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Esquema do Vendedor
const vendedorSchema = new mongoose.Schema({
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
  descricao: {
    type: String,
    default: '',
  },
  imagemPerfil: {
    type: String, // Caminho ou URL da imagem
    default: '',
  },
  produtos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto', // Relaciona com os produtos
  }],
}, { timestamps: true });

/*
// Hash da senha antes de salvar
vendedorSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Comparar senha
vendedorSchema.methods.comparePassword = function (senha) {
  return bcrypt.compare(senha, this.senha);
};
*/
module.exports = mongoose.model('Vendedor', vendedorSchema);
