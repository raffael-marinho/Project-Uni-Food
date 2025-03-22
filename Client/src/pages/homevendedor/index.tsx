import React, { useEffect, useState } from "react";
import NavBarVenda from "../../components/NavBarVenda";
import { Button } from "@/components/ui/button";
import capa from "@/assets/imagens/capa.jpg";
import { CirclePlus, Clock } from "lucide-react";
import CardProduto from "../../components/cardProduto";
import Loading from "@/components/Loading";
import { useVendedor } from "@/context/vendedor-auth-context";
import axios from "axios"; // Assumindo que você usará axios para as requisições
import apiUrl from "@/utils/Api";
import { ImgUser, whatsapp } from "@/assets/imagens";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: string;
}

const VendedorPerfil: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]); // Estado para armazenar os produtos do vendedor
  const [status, setStatus] = useState<string>(''); // Estado para armazenar o status do vendedor
  const navigate = useNavigate();

  const { vendedor } = useVendedor(); // Obtendo o vendedor do contexto

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Função para buscar os produtos do vendedor
    const fetchProdutos = async () => {
      try {
        // Pegando o token do localStorage ou do contexto de autenticação
        const token = localStorage.getItem("token") || ""; // Exemplo de como pegar o token

        const response = await axios.get(`${apiUrl}/produto/vendedor/${vendedor?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
          },
        });

        setProdutos(response.data); // Atualiza os produtos com a resposta da API
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();

    // Atualiza o status inicial
    setStatus(vendedor?.status || 'Aberto');
  }, [vendedor?.id]);

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem("token") || ""; // Pegando o token
      const newStatus = status === "Aberto" ? "Fechado" : "Aberto"; // Alternando entre "Aberto" e "Fechado"

      await axios.put(`${apiUrl}/vendedor/${vendedor?.id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus(newStatus); // Atualiza o status local após a alteração
      toast({ title: "Status atualizado com sucesso!",
              description: `O status do vendedor foi atualizado para ${newStatus}.`,
              duration: 2000,
              variant: "default",
              className: "translate-y-7",
       });
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      toast({ title: "Erro ao atualizar o status",
              description: "Ocorreu um erro ao atualizar o status do vendedor.",
              variant: "destructive",
              duration: 2000,
              className: "translate-y-7",
       });
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center">
      <NavBarVenda />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}

      {/* Capa do Vendedor */}
      <div className="relative w-full h-40 md:h-56 bg-cover bg-center">
        <img src={vendedor?.imagemCapa || capa} className="w-full h-40 object-cover relative" alt="" />
        {/* Foto de Perfil */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24 md:w-24 md:h-24 bg-primary rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img src={vendedor?.imagemPerfil || ImgUser} alt="Foto de Perfil" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Nome do Vendedor */}
      <div className="mt-12 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{vendedor?.nome || "Nome do Vendedor"}</h1>
          <h1 className="text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis ">{vendedor?.descricao || "Descrição do Vendedor"}</h1>
          <div className="flex items-center mt-4">
            <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 mr-2" />
            <a href={`https://wa.me/${vendedor?.telefone}`} target="_blank" rel="noopener noreferrer">
              <p className="text-sm font-semibold">{vendedor?.telefone || "Telefone do Vendedor"}</p>
            </a>
          </div>
          <p
            className={`text-sm font-semibold flex items-center mt-5 ${status === "Aberto" ? "text-[#FF6A07]" : "text-foreground"
              }`}
          >
            <Clock className="w-6 h-6 mr-2" />
            {status || "Status do Vendedor"}
          </p>
        </div>
      </div>

      {/* Botão para atualizar o status */}
      <div className="mt-5">
        <Button onClick={updateStatus} className="bg-primary text-white px-6 py-3 rounded-full shadow-lg">
          {status === "Aberto" ? "Fechar Loja" : "Abrir Loja"}
        </Button>
      </div>

      {/* Lista de Produtos */}
      <div className="w-full px-4 mt-6 mb-16">
        <h1 className="text-base font-semibold pt-4 pb-2">Produtos</h1>
        <div className="flex flex-col gap-4">
          {produtos.map((produto, index) => (
            <div key={index} onClick={() => navigate(`/produtovendedor/${produto._id}`)}>
              <CardProduto
                nome={produto.nome}
                descricao={produto.descricao}
                imagem={produto.imagem}
                valor={produto.preco}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botão Adicionar Produto */}
      <div className="fixed bottom-5 w-full flex justify-center">
        <Button className="bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center"
          onClick={() => navigate("/adicionarproduto")}>
          <CirclePlus /> Adicionar Produto
        </Button>
      </div>
    </div>
  );
};

export default VendedorPerfil;
