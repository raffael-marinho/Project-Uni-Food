import { useEffect, useState } from "react";
import apiUrl from "@/utils/Api";
import CardVendedor from "@/components/CardVendedor";
import CardProdutoPesq from "@/components/CardPesquisa"; // O componente de produto
import Loading from "@/components/Loading";
import BarraPesque from "@/components/BarraPesque";
import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useLocation, useNavigate } from "react-router-dom";

const Pesquisar = () => {
  const { setActiveTab } = useNav();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    setActiveTab("pesquisar");
  }, [setActiveTab]);

  const [termo, setTermo] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendedores, setVendedores] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]); // Estado para armazenar os produtos
  const [vendedoresFiltrados, setVendedoresFiltrados] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]); // Estado para armazenar os produtos filtrados

  useEffect(() => {
    const fetchVendedores = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/vendedor`);
        if (!response.ok) throw new Error("Erro ao buscar vendedores");

        const data = await response.json();
        setVendedores(data);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/produto`);
        if (!response.ok) throw new Error("Erro ao buscar produtos");

        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendedores();
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (termo === "") {
      setVendedoresFiltrados([]);
      setProdutosFiltrados([]);
    } else {
      const filteredVendedores = vendedores.filter((vendedor) =>
        vendedor.nome.toLowerCase().includes(termo.toLowerCase())
      );
      setVendedoresFiltrados(filteredVendedores);

      const filteredProdutos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(termo.toLowerCase())
      );
      setProdutosFiltrados(filteredProdutos);
    }
  }, [termo, vendedores, produtos]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="mt-8 mb-5">
        <BarraPesque termo={termo} setTermo={setTermo} />
      </div>

      <div className="flex flex-col p-4 overflow-y-auto mb-16">
        {loading ? (
          <Loading />
        ) : (
          <>
            {termo.trim() !== "" ? (
              <>
                <h2 className="text-xl font-bold">Resultados para "{termo}"</h2>
                <h1 className="text-lg font-bold mt-4">Produtos</h1>
                {produtosFiltrados.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-4">
                    {produtosFiltrados.map((produto) => (
                    <div
                    key={produto._id}
                    onClick={() => {
                      // Verifica se o pathname atual é 'pesquisar' ou outro valor
                      navigate(`/detalhesproduto/${produto._id}${pathname.includes("pesquisar") ? "?tab=pesquisar" : ""}`);
                    }}
                    className="cursor-pointer"
                  >
                      <CardProdutoPesq
                        key={produto._id}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        imagem={produto.imagem}
                        valor={produto.preco}
                      />
                    </div>
                    ))}
                  </div>
                  
                ) : (
                  <p className="text-sm mt-2">Nenhum produto encontrado.</p>
                )}
                <h1 className="text-lg font-bold mt-4">Vendedores</h1>
                {vendedoresFiltrados.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-4">
                    {vendedoresFiltrados.map((vendedor) => (
                    <div
                    key={vendedor._id}
                    onClick={() => {
                      // Verifica se o pathname atual é 'pesquisar' ou outro valor
                      navigate(`/detalhesvendedor/${vendedor._id}${pathname.includes("pesquisar") ? "?tab=pesquisar" : ""}`);
                    }}
                    className="cursor-pointer"
                  >
                      <CardVendedor
                      
                        key={vendedor._id}
                        nome={vendedor.nome}
                        telefone={vendedor.telefone}
                        status={vendedor.status}
                        imagemPerfil={vendedor.imagemPerfil}
                      />
                     </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm mt-2">Nenhum vendedor encontrado.</p>
                )}

              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-bold mt-12">Pesquise o que Você Deseja</h1>
                <p className="text-sm mt-2 text-center w-9/12">
                  Busque agora mesmo por seus lanches e vendedores
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <NavInferior />
    </div>
  );
};

export default Pesquisar;
