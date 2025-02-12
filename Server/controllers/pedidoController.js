const Pedido = require('../models/Pedido');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');
const Vendedor = require('../models/Vendedor');

const enviarEmail = require('../config/emailService');

exports.fazerPedido = async (req, res) => {
    try {
      const { clienteId, vendedorId, produtos } = req.body;
  
      // Verifica se o cliente e vendedor existem
      const cliente = await Cliente.findById(clienteId);
      if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
  
      const vendedor = await Vendedor.findById(vendedorId);
      if (!vendedor) return res.status(404).json({ message: 'Vendedor não encontrado' });
  
      // Calcula o total do pedido
      let total = 0;
      const itensPedido = [];
      for (const item of produtos) {
        const produto = await Produto.findById(item.produtoId);
        if (!produto) return res.status(404).json({ message: `Produto não encontrado: ${item.produtoId}` });
  
        total += produto.preco * item.quantidade;
        itensPedido.push({ produto: produto._id, quantidade: item.quantidade, precoUnitario: produto.preco });
      }
  
      // Cria o pedido
      const novoPedido = new Pedido({
        cliente: clienteId,
        vendedor: vendedorId,
        produtos: itensPedido,
        total,
        status: 'Pendente',
      });
  
      await novoPedido.save();
  
      // 📩 Envia e-mail para o vendedor notificando o novo pedido
      const mensagem = `
        <h3>Novo Pedido Recebido!</h3>
        <p>Você recebeu um novo pedido de <strong>${cliente.nome}</strong>.</p>
        <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
        <p>Verifique seu painel de pedidos para mais detalhes.</p>
      `;
      enviarEmail(vendedor.email, 'Novo Pedido Recebido!', mensagem);
  
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
  
      if (!['Aceito', 'Recusado'].includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Use "Aceito" ou "Recusado".' });
      }
  
      const pedido = await Pedido.findById(pedidoId).populate('cliente');
      if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
  
      pedido.status = status;
      await pedido.save();
  
      // 📩 Envia e-mail para o cliente notificando o status atualizado
      const mensagem = `
        <h3>Seu pedido foi ${status}!</h3>
        <p>Olá ${pedido.cliente.nome}, seu pedido foi <strong>${status}</strong> pelo vendedor.</p>
        <p>Entre no aplicativo para mais detalhes.</p>
      `;
      enviarEmail(pedido.cliente.email, `Seu Pedido foi ${status}`, mensagem);
  
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
  