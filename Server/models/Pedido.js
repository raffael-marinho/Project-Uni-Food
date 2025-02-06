const mongoose = require('mongoose');

// Esquema do Pedido
const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Relaciona o pedido ao cliente
    required: true,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor', // Relaciona o pedido ao vendedor
    required: true,
  },
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto', // Relaciona com os produtos comprados
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1, // Impede que alguém compre 0 produtos
    },
    precoUnitario: {
      type: Number,
      required: true,
    },
  }],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pendente','Recusado','Aceito'],
    default: 'Pendente',
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
