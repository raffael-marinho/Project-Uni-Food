import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NavInferior from "@/components/Navinferior";
import Loading from "@/components/Loading";
import { useNav } from "@/context/nav-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import apiUrl from "@/utils/Api";

interface DetailLanchesProps {
  _id: string;
  nome: string;
  vendedor: {
    _id: string;
    nome: string;
  };
  preco: number;
  imagem: string;
  descricao: string;
  ingredientes: string;
  quantidade: number;
}



const DetalhesProduto: React.FC = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { setActiveTab } = useNav();
  const queryParams = new URLSearchParams(search);
  const tab = queryParams.get("tab");
  const [lanche, setLanche] = useState<DetailLanchesProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(0);
  const [limiteMaximo, setLimiteMaximo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const total = quantidade * (lanche?.preco || 0);

  useEffect(() => {
    setActiveTab(tab === "pesquisar" ? "pesquisar" : "inicio");

    setLoading(true);
    fetch(`${apiUrl}/produto/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produto");
        return res.json();
      })
      .then((data) => {
        setLanche(data);
        setLimiteMaximo(data.quantidade);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, pathname, setActiveTab]);

  const aumentarQuantidade = () => {
    if (quantidade < limiteMaximo) setQuantidade((prev) => prev + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) setQuantidade((prev) => prev - 1);
  };

  const handleComprar = async () => {
    if (quantidade === 0 || !lanche?._id) return;
  
    setIsLoading(true);
  
    try {
      if (!token || !user) {
        console.error("Usuário não autenticado");
        navigate("/erropedido");
        return;
      }
  
      const clienteId = user?.id; 
      const vendedorId = lanche.vendedor._id;  
      const response = await fetch(`${apiUrl}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clienteId,
          vendedorId,
          produtos: [
            {
              produtoId: lanche._id,
              quantidade,
            },
          ],
        }),
      });
  
      if (response.ok) {
        navigate("/confirmarpedido");
      } else {
        console.error("Erro na compra:", await response.text());
        navigate("/erropedido");
      }
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loading />
        </div>
        <NavInferior />
      </div>
    );
  }

  if (!lanche) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex justify-center items-center pb-40">
          <h1 className="text-xl font-semibold">Produto não encontrado!</h1>
        </div>
        <NavInferior />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="relative">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <img src={lanche.imagem} className="h-44 w-full object-cover" alt={lanche.nome} />
      </div>

      <div className="flex flex-row items-center w-full pl-4 mt-2 justify-between">
        <h1 className="text-2xl font-bold w-3/4 overflow-hidden text-ellipsis whitespace-nowrap">{lanche.nome}</h1>
        <p className="text-xl font-semibold pl-1 text-primary w-1/3">R$ {lanche.preco.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-start w-full pl-4">
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.descricao}</p>
        <h1 className="text-lg font-semibold mt-8">Ingredientes</h1>
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.ingredientes}</p>
      </div>

      <div className="flex flex-row items-center pl-4 mt-28">
        <h1 className="text-lg font-semibold pr-4">Quantidade</h1>
        <button onClick={diminuirQuantidade} className="bg-[#FAAB35] p-2 rounded-full w-5 h-5 flex items-center justify-center text-lg font-bold text-foreground">-</button>
        <span className="mx-4 text-xl font-semibold">{quantidade}</span>
        <button onClick={aumentarQuantidade} className="bg-[#FAAB35] p-2 rounded-full w-5 h-5 flex items-center justify-center text-lg font-bold text-foreground">+</button>
        <h1 className="text-lg font-semibold ml-4">R$ {total.toFixed(2)}</h1>
      </div>

      <div className="flex flex-col items-center">
        <Button className="w-80 flex items-center gap-2 mt-8" onClick={handleComprar} disabled={quantidade === 0 || isLoading}>
          {isLoading ? "Processando..." : "Comprar"}
        </Button>
      </div>

      <NavInferior />
    </div>
  );
};

export default DetalhesProduto;
