import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useEffect, useState } from "react";
import axios from "axios";
import CardPedido from "../../components/CardPedido";
import { useAuth } from "../../context/auth-context";
import apiUrl from "@/utils/Api";
import Loading from "@/components/Loading";

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
    code: string;
    status: string;
    produtos: PedidoProduto[];
}

const Pedidos = () => {
    const { setActiveTab } = useNav();
    const { user } = useAuth();  // Obtendo o usuário logado
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setActiveTab("pedidos");
    }, [setActiveTab]);

    useEffect(() => {
        if (user && user.id) {  // Agora usando user.id como o clienteId
            const fetchPedidos = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/pedidos/cliente/${user.id}`);
                    console.log(response.data); // Verifique os dados retornados pela API
                    setPedidos(response.data);  // Atualizando apenas 'pedidos'
                    setLoading(false);
                } catch (err) {
                    setError("Erro ao carregar os pedidos.");
                    setLoading(false);
                }
            };

            fetchPedidos();
        }
    }, [user]);

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div>
                {loading && (
                    <div className="flex justify-center items-center h-screen pb-64">
                        <Loading />  {/* Aqui você chama o componente Loading */}
                    </div>
                )}
                {error && !loading && (
                    <div className="flex justify-center items-center h-screen pb-64">
                        <p className="text-primary text-lg">{error}</p>  {/* Exibe a mensagem de erro em vermelho */}
                    </div>
                )}
            </div>
            <div className="flex flex-col p-5 text-base font-semibold pb-2">
                <div>
                    <h1 className="text-2xl font-semibold">Meus Pedidos</h1>
                    <p className="text-xs pb-4">Aqui estão os seus pedidos</p>
                    <div className="flex flex-col gap-4 ">
                        {pedidos.length === 0 && !loading ? (
                            <p className="text-lg flex items-center">Você não tem pedidos.</p>
                        ) : (
                            pedidos.map((pedido, index) => (
                                pedido.produtos && pedido.produtos.length > 0 ? (
                                    pedido.produtos.map((produto, produtoIndex) => (
                                        <CardPedido
                                            key={`${index}-${produtoIndex}`}
                                            nome={produto.produto.nome}  // Acessando nome do produto
                                            imagem={produto.produto.imagem}  // Acessando imagem do produto
                                            descricao={produto.produto.descricao}  // Acessando descrição do produto
                                            code={pedido.code}  // Usando o ID do pedido como código
                                            status={pedido.status}
                                        />
                                    ))
                                ) : (
                                    <p>Este pedido não contém produtos.</p>
                                )
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NavInferior />
        </div>
    );
};

export default Pedidos;
