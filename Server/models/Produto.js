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
  },
  preco: {
    type: Number,
    required: true,
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
