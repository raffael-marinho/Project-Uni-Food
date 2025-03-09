import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useEffect, useState } from "react";
import axios from "axios";
import CardPedido from "../../components/CardPedido";
import { useAuth } from "../../context/auth-context";
import apiUrl from "@/utils/Api";
import Loading from "@/components/Loading";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Produto {
    nome: string;
    imagem: string;
    descricao: string;
}

interface PedidoProduto {
    produto: Produto;
    quantidade: number;
    precoUnitario: number;

}

interface Pedido {
    codigoPedido: string;
    status: string;
    produtos: PedidoProduto[];
    dataPedido: string;
    chavePix: string;
}

const Pedidos = () => {
    const { setActiveTab } = useNav();
    const { user } = useAuth();  
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        setActiveTab("pedidos");
    }, [setActiveTab]);

    useEffect(() => {
        if (user && user.id) {  
            const fetchPedidos = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/pedidos/cliente/${user.id}`);
                    setPedidos(response.data);
                    setLoading(false);
                } catch (err) {
                    setError("Erro ao carregar os pedidos.");
                    setLoading(false);
                }
            };

            fetchPedidos();
        }
    }, [user]);

    const openModal = (pedido: Pedido) => {
        setSelectedPedido(pedido);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPedido(null);
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div>
                {loading && (
                    <div className="flex justify-center items-center h-screen pb-64">
                        <Loading /> 
                    </div>
                )}
                {error && !loading && (
                    <div className="flex justify-center items-center h-screen pb-64">
                        <p className="text-primary text-lg">{error}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col p-5 text-base font-semibold pb-2 mb-16">
                <div>
                    <h1 className="text-2xl font-semibold">Meus Pedidos</h1>
                    <p className="text-xs pb-4">Aqui estão os seus pedidos</p>
                    <div className="flex flex-col gap-4 ">
                        {pedidos.length === 0 && !loading ? (
                            <p className="text-lg flex items-center">Você não tem pedidos.</p>
                        ) : (
                            pedidos
                                .slice() 
                                .sort((a, b) => new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime()) // Ordena do mais recente para o mais antigo
                                .map((pedido, index) => (
                                    pedido.produtos && pedido.produtos.length > 0 ? (
                                        pedido.produtos.map((produto, produtoIndex) => (
                                            <CardPedido
                                                key={`${index}-${produtoIndex}`}
                                                nome={produto.produto.nome}
                                                imagem={produto.produto.imagem}
                                                descricao={produto.produto.descricao}
                                                code={pedido.codigoPedido}
                                                status={pedido.status}
                                                onClick={() => void openModal(pedido)}
                                            />
                                        ))
                                    ) : (
                                        <p>Este pedido não contém produtos.</p>
                                    )
                                ))
                        )}
                    </div>
                    <div>

                    </div>
                    {modalOpen && selectedPedido && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                            <div className="bg-[#FFF6E0] p-6 rounded-lg shadow-lg w-96 relative">

                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-primary p-3 rounded-full hover:bg-primary hover:text-white duration-200"
                                >
                                    <XIcon className="h-6 w-6" />
                                </button>

                                <h2 className="text-xl font-semibold mb-4">Código {selectedPedido.codigoPedido}</h2>
                                <p className="text-sm text-primary mb-4">Status: {selectedPedido.status}</p>

                                <h3 className="font-semibold mb-2">Produtos:</h3>
                                <ul>
                                    {selectedPedido.produtos.map((produto, index) => (
                                        <li key={index} className="mb-2">
                                            <img
                                                src={produto.produto.imagem}
                                                alt={produto.produto.nome}
                                                className="w-16 h-16 rounded-md mr-2 inline-block"
                                            />
                                            <div className="inline-block align-middle">
                                                <p className="font-semibold">{produto.produto.nome}</p>
                                                <p className="text-sm">Quantidade: {produto.quantidade}</p>
                                                <p className="text-sm">Preço: R$ {produto.precoUnitario}</p>
                                                <p className="text-sm pb-2">Total: R$ {produto.precoUnitario * produto.quantidade}</p>
                                            
                                                {selectedPedido.status !== "Finalizado" && selectedPedido.status !== "Cancelado" ? (
                                                    <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-44">
                                                        Chave Pix: {selectedPedido.chavePix}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-primary">
                                                        {selectedPedido.status === "Finalizado" ? "Produto Pago" : "Produto Cancelado"}
                                                    </p>
                                                )}

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {selectedPedido.status !== "Finalizado" && selectedPedido.status !== "Cancelado" && (
                                    <Button
                                        onClick={() => navigator.clipboard.writeText(selectedPedido.chavePix)}
                                        className="mt-4 w-full p-2 rounded-lg"
                                    >
                                        Copiar Chave Pix
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <NavInferior />
        </div>
    );
};

export default Pedidos;
