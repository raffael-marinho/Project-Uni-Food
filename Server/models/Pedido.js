const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigoPedido: {
    type: String, // Código de 2 caracteres
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor',
    required: true,
  },
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1,
    },
    precoUnitario: {
      type: Number,
      required: true,
    },
  }],
  status: {
    type: String,
    enum: ['Pendente', 'Aceito', 'Finalizado', 'Cancelado'],
    default: 'Pendente',
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
