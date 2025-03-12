import { useEffect, useState } from "react";
import NavBarVenda from "@/components/NavBarVenda";
import CardPedidoVendas from "@/components/cardPedidoVenda";
import { useVendedor } from "@/context/vendedor-auth-context";
import apiUrl from "@/utils/Api";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Loading from "@/components/Loading";
import { toast } from "@/hooks/use-toast";

const PedidosVendedor = () => {
  const { vendedor, token } = useVendedor();
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<any>(null);

  // Função para buscar os pedidos
  const fetchPedidos = async () => {
    if (!vendedor?.id || !token) return;

    try {
      const response = await fetch(`${apiUrl}/pedidos/vendedor/${vendedor.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos");
      }
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [vendedor, token]);

  const handlePedidoClick = (pedido: any) => {
    setPedidoSelecionado(pedido);
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setPedidoSelecionado(null);
  };

  const handleAtualizarStatusPedido = async (status: string) => {
    if (!pedidoSelecionado) return;

    try {
      const response = await fetch(`${apiUrl}/pedidos/${pedidoSelecionado._id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Envia o novo status no corpo da requisição
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status do pedido");
      }

      const data = await response.json();
      toast({
        title: "Pedido Finalizado",
        description: data.message,
        variant: "default",
        duration: 800,
        className: "translate-y-7",
      })

      // Chama a função fetchPedidos para recarregar a lista de pedidos
      fetchPedidos();

      // Fechar o modal após a atualização do status
      setModalAberto(false);
      setPedidoSelecionado(null);

    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao atualizar o status do pedido",
        description: "Ocorreu um erro ao atualizar o status do pedido.",
        variant: "destructive",
        duration: 800,
        className: "translate-y-7",
      })
    }
  };
  const handleCancelarPedido = async () => {
    if (!pedidoSelecionado) return;

    try {
      const response = await fetch(`${apiUrl}/pedidos/${pedidoSelecionado._id}/cancelar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao cancelar o pedido");
      }

      const data = await response.json();
      toast({
        title: "Pedido cancelado",
        description: data.message,
        variant: "default",
        duration: 800,
        className: "translate-y-7",
      })

      // Chama a função fetchPedidos para recarregar a lista de pedidos
      fetchPedidos();

      // Fechar o modal após o cancelamento
      setModalAberto(false);
      setPedidoSelecionado(null);

    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao cancelar o pedido",
        description: "Ocorreu um erro ao cancelar o pedido.",
        variant: "destructive",
        duration: 800,
        className: "translate-y-7",

      })
    }
  };




  return (
    <div className="flex flex-col h-screen">
      <NavBarVenda />

      <div className="flex flex-col p-5 text-base font-semibold pb-2">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        )}
        <h1 className="text-2xl mb-8 font-semibold">Aqui estão os seus pedidos</h1>
        <div className="flex flex-col gap-4">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => {
              // Filtrando os produtos inválidos (nulos ou indefinidos)
              const produtosValidos = pedido.produtos
                .filter((p: any) => p.produto) // Remove produtos inválidos
                .map((p: any) => ({
                  nome: p.produto?.nome ?? "Produto indisponível",
                  preco: p.precoUnitario * p.quantidade,
                }));

              return (
                <CardPedidoVendas
                  key={pedido._id}
                  nome={pedido.cliente.nome}
                  codigoPedido={pedido.codigoPedido}
                  status={pedido.status}
                  produtos={produtosValidos} // Passando apenas produtos válidos
                  total={produtosValidos.reduce(
                    (acc: number, p: any) => acc + p.preco,
                    0
                  )}
                  onOpen={() => handlePedidoClick(pedido)} // Abre o modal
                  onClose={handleCloseModal}
                  onClick={() => handlePedidoClick(pedido)} // Fecha o modal
                />
              );
            })
          ) : (
            <p>Nenhum pedido encontrado.</p>
          )}

        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
      {modalAberto && pedidoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
          <div className="bg-[#FFF6E0] p-6 rounded-lg max-w-lg w-full">
            <button onClick={handleCloseModal} className="relative top-0 left-60 text-primary w-8 h-8 flex justify-center items-center rounded-full">
              <XCircle />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Detalhes do Pedido</h2>
            <div className="mb-4 flex flex-col justify-center">
              <p><strong>Código do Pedido:</strong> {pedidoSelecionado.codigoPedido}</p>
              <p><strong>Cliente:</strong> {pedidoSelecionado.cliente.nome}</p>
              <p><strong>Status:</strong> {pedidoSelecionado.status}</p>
              <p><strong>Data do Pedido:</strong> {new Date(pedidoSelecionado.dataPedido).toLocaleDateString()}</p>
              <p><strong>Hora do Pedido:</strong> {new Date(pedidoSelecionado.dataPedido).toLocaleTimeString()}</p>
              <h3 className="font-semibold mt-4">Produtos:</h3>
              <ul>
                {/* Filtra produtos nulos ou inválidos antes de renderizar */}
                {pedidoSelecionado.produtos.filter((p: any) => p.produto).length > 0 ? (
                  pedidoSelecionado.produtos
                    .filter((p: any) => p.produto) // Remove produtos inválidos
                    .map((p: any) => (
                      <li key={p.produto._id}>
                        {p.produto.nome} - {p.quantidade} x R$ {p.precoUnitario} = R$ {p.precoUnitario * p.quantidade}
                      </li>
                    ))
                ) : (
                  <p>Sem produtos válidos no pedido.</p>
                )}
              </ul>
              <p className="font-semibold mt-4">
                <strong>Total:</strong> R$ {pedidoSelecionado.produtos
                  .filter((p: any) => p.produto) // Considera apenas produtos válidos
                  .reduce((acc: number, p: any) => acc + p.precoUnitario * p.quantidade, 0)}
              </p>
            </div>

            {/* Verificando se o pedido tem produtos válidos para mostrar os botões */}
            {pedidoSelecionado.produtos.filter((p: any) => p.produto).length > 0 && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleAtualizarStatusPedido('Finalizado')} variant={"default"}>Finalizar Pedido</Button>
                <Button onClick={() => handleCancelarPedido()} variant={"outline"}>Cancelar Pedido</Button>
              </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
};

export default PedidosVendedor;
