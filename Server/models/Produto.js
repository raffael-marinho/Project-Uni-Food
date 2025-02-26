const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
    maxlength: 500,
  },
  ingredientes: [{
    type: String,
  }],
  imagem: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
    min: 0,
  },
  quantidade: {
    type: Number,
    required: true,
    min: 0,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor', // Relaciona o produto a um vendedor
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);
