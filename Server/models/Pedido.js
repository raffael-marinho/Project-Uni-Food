const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
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
    enum: ['Pendente', 'Em andamento', 'Finalizado', 'Cancelado'],
    default: 'Pendente',
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Middleware para calcular o total antes de salvar
pedidoSchema.pre('save', function (next) {
  this.total = this.produtos.reduce((acc, item) => acc + item.quantidade * item.precoUnitario, 0);
  next();
});

module.exports = mongoose.model('Pedido', pedidoSchema);
