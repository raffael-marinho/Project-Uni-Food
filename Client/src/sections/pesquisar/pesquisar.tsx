import { useEffect, useState } from "react";
import apiUrl from "@/utils/Api";
import CardVendedor from "@/components/CardVendedor";
import Loading from "@/components/Loading";
import BarraPesque from "@/components/BarraPesque";
import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";

const Pesquisar = () => {
  const { setActiveTab } = useNav();

  useEffect(() => {
    setActiveTab("pesquisar");
  }, [setActiveTab]);

  const [termo, setTermo] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendedores, setVendedores] = useState<any[]>([]);
  const [vendedoresFiltrados, setVendedoresFiltrados] = useState<any[]>([]);

  useEffect(() => {
    const fetchVendedores = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/vendedor`);
        if (!response.ok) throw new Error("Erro ao buscar vendedores");

        const data = await response.json();
        console.log("Vendedores recebidos:", data); 
        setVendedores(data);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendedores();
  }, []);

  useEffect(() => {
    if (termo === "") {
      setVendedoresFiltrados([]);
    } else {
      const filtered = vendedores.filter((vendedor) =>
        vendedor.nome.toLowerCase().includes(termo.toLowerCase())
      );
      console.log("Vendedores filtrados:", filtered);
      setVendedoresFiltrados(filtered);
    }
  }, [termo, vendedores]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="mt-8 mb-5">
        <BarraPesque termo={termo} setTermo={setTermo} />
      </div>

      <div
        className="flex flex-col p-4 overflow-y-auto mb-16"

      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {termo && (
              <>
                <h2 className="text-xl font-bold">Resultados para "{termo}"</h2>
                <h1 className="text-lg font-bold mt-4">Vendedores</h1>
                {vendedoresFiltrados.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-4">
                    {vendedoresFiltrados.map((vendedor) => (
                      <CardVendedor
                        key={vendedor._id}
                        nome={vendedor.nome}
                        telefone={vendedor.telefone}
                        status={vendedor.status}
                        imagemPerfil={vendedor.imagemPerfil}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm  mt-2">Nenhum vendedor encontrado.</p>
                )}
              </>
            )}
          </>
        )}

      </div>
      <NavInferior />
    </div>
  );
};

export default Pesquisar;
