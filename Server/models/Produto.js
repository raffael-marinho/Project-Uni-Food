const mongoose = require('mongoose');

// Esquema do Produto
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
  preco: {
    type: Number,
    required: true,
    min: 0,
  },
  imagens: [{
    type: String, // Caminhos ou URLs das imagens
  }],
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor', // Relaciona o produto a um vendedor
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);
