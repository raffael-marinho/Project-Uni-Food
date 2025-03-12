import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import NavInferior from "@/components/Navinferior";
import apiUrl from "@/utils/Api";
import { useAuth } from "@/context/auth-context";
import { capa, ImgUser } from "@/assets/imagens";
import Loading from "@/components/Loading";
import { whatsapp } from "@/assets/imagens";
import { ArrowLeft, Clock } from "lucide-react";
import { useNav } from "@/context/nav-context";
import CardProduto from "@/components/cardProduto";

interface Vendedor {
    _id: string;
    nome: string;
    imagemCapa: string;
    imagemPerfil: string;
    descricao: string;
    telefone: string;
    status: string;
}

interface Produto {
    _id: string;
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

const DetalheVendedor = () => {
    const { id } = useParams<{ id: string }>();
    const [vendedor, setVendedor] = useState<Vendedor | null>(null);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const { setActiveTab } = useNav();
    const { pathname } = useLocation();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const tab = queryParams.get("tab");
    const navigate = useNavigate();

    useEffect(() => {
        if (tab === "pesquisar") {
            setActiveTab("pesquisar");
        } else {
            setActiveTab("inicio");
        }
        setLoading(true);

        // Função para buscar o vendedor
        const fetchVendedor = async () => {
            try {
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${apiUrl}/vendedor/${id}`, { headers });
                if (!response.ok) throw new Error("Erro ao buscar vendedor");

                const data = await response.json();
                setVendedor(data);
            } catch (error) {
                console.error(error);
                setVendedor(null);
            }
        };

        // Função para buscar os produtos do vendedor
        const fetchProdutos = async () => {
            try {
                const headers: HeadersInit = {};
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${apiUrl}/produto/vendedor/${id}`, { headers });
                if (!response.ok) throw new Error("Erro ao buscar produtos");

                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error(error);
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVendedor();
            fetchProdutos();
        }
    }, [id, token, pathname, setActiveTab]);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col items-center h-screen">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loading />
                    </div>
                ) : vendedor ? (
                    <div className="flex flex-col w-full mb-16">

                        <div
                            className="relative w-full h-40 md:h-56 bg-cover bg-center"
                            style={{ backgroundImage: `url(${vendedor.imagemCapa || capa})` }}
                        >
                            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md">
                                      <ArrowLeft className="w-6 h-6 text-white" />
                                    </button>
                
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24 md:w-24 md:h-24 bg-primary rounded-full overflow-hidden border-4 border-primary shadow-lg">
                                <img
                                    src={vendedor.imagemPerfil || ImgUser}
                                    alt={vendedor.nome}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-8">
                            <h1 className="text-xl font-bold mt-4 whitespace-nowrap overflow-hidden text-ellipsis">{vendedor.nome}</h1>
                            <h1 className="text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis ">{vendedor.descricao}</h1>
                            <div className="flex items-center mt-4">
                                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 mr-2" />
                                <a href={`https://wa.me/${vendedor.telefone}`} target="_blank" rel="noopener noreferrer">
                                    <p className="text-sm font-semibold">Entrar em contato</p>
                                </a>
                            </div>

                            <p
                                className={`text-sm font-semibold flex items-center mt-5 ${vendedor.status.toLowerCase() === "aberto" ? "text-[#FF6A07]" : "text-foreground"
                                    }`}
                            >
                                <Clock className="w-6 h-6 mr-2" />
                                {vendedor.status}
                            </p>
                        </div>

                    
                        <div className="flex flex-col items-start p-5">
                            <h1 className="text-lg font-bold mt-4">Produtos</h1>
                            {produtos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {produtos.map((produto) => (
                                    <div
                                        key={produto._id}
                                        onClick={() => navigate(`/detalhesproduto/${produto._id}`)}>
                                        <CardProduto
                                            key={produto._id}
                                            nome={produto.nome}
                                            descricao={produto.descricao}
                                            valor={produto.preco}
                                            imagem={produto.imagem}
                                        />
                                    </div>   
                                ))}
                            </div>
                        ) : (
                      <p className="text-lg font-medium">Nenhum produto encontrado.</p>
                        )}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg font-bold mt-24">Vendedor não encontrado.</p>
                )}
            </div>
            <NavInferior />
        </div>
    );
};

export default DetalheVendedor;
