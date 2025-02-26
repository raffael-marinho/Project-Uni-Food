const mongoose = require('mongoose');

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
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
