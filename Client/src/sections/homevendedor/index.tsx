import NavBarVenda from "../../components/NavBarVenda";
import { Button } from "@/components/ui/button";
import capa from "@/assets/imagens/capa.jpg";
import { CirclePlus } from "lucide-react";
import CardProduto from "../../components/cardProduto"; // Card original
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { dadosLanches } from "@/assets/dadoscards"; // Importe os dados dos lanches
import CardLanche from "@/components/CardLanche";

const VendedorPerfil: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [produtosExibidos, setProdutosExibidos] = useState(3); // Número inicial de produtos exibidos
  const [loadingMore, setLoadingMore] = useState(false);

  // Simulação de carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Função para carregar mais produtos
  const carregarMaisProdutos = () => {
    if (loadingMore || produtosExibidos >= 10) return; // Limite de 10 produtos para exemplo
    setLoadingMore(true);
    setTimeout(() => {
      setProdutosExibidos((prevState) => prevState + 3);
      setLoadingMore(false);
    }, 1000);
  };

  // Função para lidar com a rolagem
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      carregarMaisProdutos();
    }
  };

  return (
    <div className="bg-[#FCE7D5] min-h-screen flex flex-col items-center">
      <NavBarVenda />

      {/* Capa do Vendedor */}
      <div
        className="relative w-full h-40 md:h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${capa})` }}
      >
        {/* Foto de Perfil */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24 md:w-24 md:h-24 bg-primary rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fbKWx3FrfmwLauu0iXO4wY8VgjAcngaKqA&s"
            alt="Foto de Perfil"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Nome do Vendedor */}
      <div className="mt-12 text-center">
        <h1 className="text-xl font-bold text-tertiary">Hamburguer Fast</h1>
      </div>

      {/* Lista de Produtos */}
      <div
        className="w-full px-4 mt-6 overflow-y-auto flex-1"
        style={{ marginBottom: "4rem" }}
        onScroll={handleScroll}
      >
        {loading && (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}

        {/* Seção "Mais Vendidos" */}
        <h1 className="text-base font-semibold pt-4 pb-2">Mais Vendidos</h1>
        <div className="flex px-1 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {dadosLanches.map((lanche) => (
            <div
              key={lanche.id}
              className="min-w-[150px]" // Removido o cursor-pointer e o onClick
            >
          <CardLanche
                  titulo={lanche.titulo}
                  vendedor={lanche.vendedor}
                  preco={lanche.preco}
                  imagem={lanche.imagem}
                />
            </div>
          ))}
        </div>

        {/* Seção de Produtos (CardProduto original) */}
        <h1 className="text-base font-semibold pt-4 pb-2">Produtos</h1>
        <div className="flex flex-col gap-4">
          {Array.from({ length: produtosExibidos }).map((_, index) => (
            <CardProduto
              key={index}
              nome={`Hambúrguer Artesanal ${index + 1}`}
              descricao="Pão, carne, queijo, alface e tomate"
              imagem="https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg"
              valor="25,00"
            />
          ))}
        </div>

        {loadingMore && (
          <div className="flex justify-center mt-4">
            <Loading />
          </div>
        )}
      </div>

      {/* Botão Adicionar Produto */}
      <div className="fixed bottom-5 w-full flex justify-center">
        <Button className="bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center">
          <CirclePlus /> Adicionar Produto
        </Button>
      </div>
    </div>
  );
};

export default VendedorPerfil;