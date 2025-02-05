const Pedido = require('../models/Pedido');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');

exports.fazerPedido = async (req, res) => {
  try {
    const { clienteId, vendedorId, produtos } = req.body;

    // Verifica se o cliente existe
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Calcula o total do pedido e valida os produtos
    let total = 0;
    const itensPedido = [];

    for (const item of produtos) {
      const produto = await Produto.findById(item.produtoId);
      if (!produto) {
        return res.status(404).json({ message: `Produto não encontrado: ${item.produtoId}` });
      }

      total += produto.preco * item.quantidade;
      itensPedido.push({
        produto: produto._id,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
      });
    }

    // Cria o pedido
    const novoPedido = new Pedido({
      cliente: clienteId,
      vendedor: vendedorId,
      produtos: itensPedido,
      total,
    });

    await novoPedido.save();

    res.status(201).json({ message: 'Pedido realizado com sucesso!', pedido: novoPedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer pedido', error });
  }
};
