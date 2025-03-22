const Pedido = require('../models/Pedido');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');
const Vendedor = require('../models/Vendedor');
const mongoose = require('mongoose');

const enviarEmail = require('../config/emailService');

exports.fazerPedido = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const { clienteId, vendedorId, produtos } = req.body;

      const cliente = await Cliente.findById(clienteId);
      if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

      const vendedor = await Vendedor.findById(vendedorId);
      if (!vendedor) return res.status(404).json({ message: 'Vendedor não encontrado' });

      let total = 0;
      const itensPedido = [];

      for (const item of produtos) {
          const produto = await Produto.findById(item.produtoId).session(session);
          if (!produto) return res.status(404).json({ message: `Produto não encontrado: ${item.produtoId}` });

          if (produto.quantidade < item.quantidade) {
              return res.status(400).json({ message: `Estoque insuficiente para o produto: ${produto.nome}` });
          }

          total += produto.preco * item.quantidade;
          itensPedido.push({ produto: produto._id, quantidade: item.quantidade, precoUnitario: produto.preco });

          produto.quantidade -= item.quantidade;
          await produto.save({ session });
      }

      // 📌 Gerando um código de pedido de 2 caracteres aleatórios (Ex: "A1", "Z9")
      const gerarCodigoPedido = () => {
          const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          return caracteres.charAt(Math.floor(Math.random() * caracteres.length)) +
                 caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      };

      const codigoPedido = gerarCodigoPedido();

      // Criando o pedido com código gerado
      const novoPedido = new Pedido({
          codigoPedido,
          cliente: clienteId,
          vendedor: vendedorId,
          produtos: itensPedido,
          total,
          status: 'Pendente',
      });

      await novoPedido.save({ session });

      await session.commitTransaction();
      session.endSession();

      // Envio de e-mail (opcional)
      const mensagem = `
          <h3>Novo Pedido Recebido!</h3>
          <p>Você recebeu um novo pedido de <strong>${cliente.nome}</strong>.</p>
          <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
          <p><strong>Código do Pedido:</strong> ${codigoPedido}</p>
          <p>Verifique seu painel de pedidos para mais detalhes.</p>
      `;
      enviarEmail(vendedor.email, 'Novo Pedido Recebido!', mensagem);

      res.status(201).json({ message: 'Pedido realizado com sucesso!', pedido: novoPedido });

  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: 'Erro ao fazer pedido', error });
  }
};



// Atualizar status do pedido pelo vendedor
exports.atualizarStatusPedido = async (req, res) => {
    try {
      const { pedidoId } = req.params;
      const { status } = req.body;
  
      if (!['Aceito', 'Finalizado'].includes(status)) {
        return res.status(400).json({ message: 'Status inválido. Use "Aceito" ou "Finalizado".' });
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

        // Busca os pedidos do cliente e popula os produtos
        const pedidos = await Pedido.find({ cliente: clienteId }).populate('produtos.produto');

        if (pedidos.length === 0) {
            return res.status(404).json({ message: 'Nenhum pedido encontrado para este cliente.' });
        }

        // Coletar todos os IDs dos vendedores para buscar de uma vez só
        const vendedoresIds = pedidos.map(pedido => pedido.vendedor);
        const vendedores = await Vendedor.find({ _id: { $in: vendedoresIds } });

        // Criar um mapa de vendedores para evitar múltiplas buscas
        const vendedoresMap = {};
        vendedores.forEach(vendedor => {
            vendedoresMap[vendedor._id] = {
                chavePix: vendedor.chavePix,
                email: vendedor.email,
                telefone: vendedor.telefone
            };
        });

        // Adicionar as informações do vendedor nos pedidos
        const pedidosComInfo = pedidos.map(pedido => {
            const pedidoObj = pedido.toObject(); // Converter para objeto manipulável
            const vendedorInfo = vendedoresMap[pedido.vendedor] || {};
            
            return {
                ...pedidoObj,
                chavePix: vendedorInfo.chavePix || null,
                vendedorEmail: vendedorInfo.email || null,
                vendedorTelefone: vendedorInfo.telefone || null
            };
        });

        res.status(200).json(pedidosComInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar pedidos do cliente', error });
    }
};

  
exports.listarPedidosVendedor = async (req, res) => {
  try {
    const { vendedorId } = req.params;

    const pedidos = await Pedido.find({ vendedor: vendedorId, status: 'Pendente' })
      .populate('produtos.produto')
      .populate('cliente', 'nome email telefone'); // Populando os dados do cliente

    if (pedidos.length === 0) {
      return res.status(404).json({ message: 'Nenhum pedido encontrado para este vendedor.' });
    }

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos do vendedor', error });
  }
};
 


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

      // 📩 Envia e-mail para o cliente notificando o cancelamento
      const mensagem = `
        <h3>Seu pedido foi cancelado!</h3>
        <p>Olá ${pedido.cliente.nome}, seu pedido foi <strong>cancelado</strong> pelo vendedor.</p>
        <p>Entre no aplicativo para mais detalhes.</p>
      `;
      enviarEmail(pedido.cliente.email, 'Seu Pedido foi Cancelado', mensagem);

      // Retornar o produto ao estoque
      for (const item of pedido.produtos) {
        const produto = await Produto.findById(item.produto);
        produto.quantidade += item.quantidade;
        await produto.save();
      }
  

      await pedido.save();
  
      res.status(200).json({ message: 'Pedido cancelado com sucesso!', pedido });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cancelar pedido', error });
    }
  };
  