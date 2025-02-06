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

    // Cria o pedido com status "Pendente"
    const novoPedido = new Pedido({
      cliente: clienteId,
      vendedor: vendedorId,
      produtos: itensPedido,
      total,
      status: 'Pendente', // Status inicial
    });

    await novoPedido.save();

    res.status(201).json({ message: 'Pedido realizado com sucesso!', pedido: novoPedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer pedido', error });
  }
};

// Atualizar status do pedido pelo vendedor
exports.atualizarStatusPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const { status } = req.body;

    // Verifica se o status é válido
    if (!['Aceito', 'Recusado'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido. Use "Aceito" ou "Recusado".' });
    }

    // Busca o pedido
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // Atualiza o status
    pedido.status = status;
    await pedido.save();

    res.status(200).json({ message: `Pedido ${status} com sucesso!`, pedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status do pedido', error });
  }
};

exports.listarPedidosCliente = async (req, res) => {
    try {
      const { clienteId } = req.params;
      
      const pedidos = await Pedido.find({ cliente: clienteId }).populate('produtos.produto');
      
      if (pedidos.length === 0) {
        return res.status(404).json({ message: 'Nenhum pedido encontrado para este cliente.' });
      }
  
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedidos do cliente', error });
    }
  };
  
  exports.listarPedidosVendedor = async (req, res) => {
    try {
      const { vendedorId } = req.params;
      
      const pedidos = await Pedido.find({ vendedor: vendedorId , status: 'Pendente'}).populate('produtos.produto');
      
      if (pedidos.length === 0) {
        return res.status(404).json({ message: 'Nenhum pedido encontrado para este vendedor.' });
      }
  
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar pedidos do vendedor', error });
    }
  }  


  exports.cancelarPedido = async (req, res) => {
    try {
      const { pedidoId } = req.params;
  
      const pedido = await Pedido.findById(pedidoId);
  
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }
  
      if (pedido.status !== 'Pendente') {
        return res.status(400).json({ message: 'Pedido já foi processado e não pode ser cancelado' });
      }
  
      pedido.status = 'Cancelado';
      await pedido.save();
  
      res.status(200).json({ message: 'Pedido cancelado com sucesso!', pedido });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cancelar pedido', error });
    }
  };
  