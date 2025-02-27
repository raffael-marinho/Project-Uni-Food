const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  /*
  senha: {
    type: String,
    required: true,
  },*/
  firebaseUID: { // Identificador do Firebase
    type: String,
    required: true,
    unique: true,
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
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['aberto', 'fechado'],
    default: 'aberto',
  },
  chavePix: {
    type: String,
    default: '',
  },
  imagemCapa: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Vendedor', vendedorSchema);
