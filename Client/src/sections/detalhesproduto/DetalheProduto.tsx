import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NavInferior from "@/components/Navinferior";
import { dadosLanches } from "@/assets/dadoscards";
import Loading from "@/components/Loading"; 
import { useNav } from "@/context/nav-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface DetailLanchesProps {
  id: number;
  titulo: string;
  vendedor: string;
  preco: string;
  imagem: string;
  descricao: string;
  ingredientes: string;
  quantidade: number; 
}

const DetalhesProduto: React.FC = () => {
  const { id } = useParams(); 
  const { setActiveTab } = useNav();
  const [lanche, setLanche] = useState<DetailLanchesProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(0); 
  const [limiteMaximo, setLimiteMaximo] = useState(0); 
  const total = quantidade * parseFloat(lanche?.preco || "0");

  useEffect(() => {
    setActiveTab("inicio");

    // Simulação de busca de dados com delay
    const lancheEncontrado = dadosLanches.find(l => String(l.id) === id);
    if (lancheEncontrado) {
      setLanche(lancheEncontrado);
      setLimiteMaximo(lancheEncontrado.quantidade); 
    }

    setLoading(false);
  }, [id]);

  const aumentarQuantidade = () => {
    if (quantidade < limiteMaximo) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) { 
      setQuantidade(quantidade - 1);
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
  {/* Botão de voltar */}
  <Link to="/home" className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md">
    <ArrowLeft className="w-6 h-6 text-white" />
  </Link>

  {/* Imagem do produto */}
  <img src={lanche.imagem} className="h-44 w-full object-cover" alt={lanche.titulo} />
</div>
      <div className="flex flex-row items-center w-full pl-4 mt-2 justify-between">
        <h1 className="text-2xl font-bold w-3/4 overflow-hidden text-ellipsis whitespace-nowrap">{lanche.titulo}</h1>
        <p className="text-xl font-semibold pl-1 text-primary w-1/3">R$ {lanche.preco}</p>
      </div>
      <div className="flex flex-col items-start w-full pl-4">
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.descricao}</p>
        <h1 className="text-lg font-semibold mt-8">Ingredientes</h1>
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.ingredientes}</p>
      </div>

      {/* Seção de Quantidade */}
      <div className="flex flex-row items-center pl-4 mt-28">
        <h1 className="text-lg font-semibold pr-4">Quantidade</h1>
        <button 
          onClick={diminuirQuantidade} 
          className="bg-[#FAAB35] p-2 rounded-full w-5 h-5 flex items-center justify-center  text-lg font-bold text-foreground">
          -
        </button>
        <span className="mx-4 text-xl font-semibold">{quantidade}</span>
        <button 
          onClick={aumentarQuantidade} 
          className="bg-[#FAAB35] p-2 rounded-full w-5 h-5 flex items-center justify-center text-lg font-bold text-foreground">
          +
        </button>
        <h1 className="text-lg font-semibold ml-4">R$ {total.toFixed(2)}</h1>
      </div>
      <div className="flex flex-col items-center">
        <Button className="w-80 flex items-center gap-2 mt-8" onClick={() => {}}>Comprar</Button>
      </div>

      <NavInferior />
    </div>
  );
};

export default DetalhesProduto;
