import Navbar from '@/components/Navbar';
import NavInferior from '@/components/Navinferior';
import { useEffect, useState } from 'react';
import { useNav } from '@/context/nav-context';
import { banner01, banner02, banner03 } from '@/assets/imagens';
import getSaudacao from '@/utils/saudacao';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useAuth } from '@/context/auth-context';
import CardLanche from '@/components/CardLanche';
import CardVendedor from '@/components/CardVendedor';
import Loading from '@/components/Loading';
import { useNavigate } from 'react-router-dom';
import apiUrl from '@/utils/Api';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setActiveTab } = useNav();
  const [loading, setLoading] = useState(true);
  const [vendedores, setVendedores] = useState<any[]>([]); // Estado para armazenar vendedores da API
  const [produtos, setProdutos] = useState<any[]>([]);
  const [vendedoresExibidos, setVendedoresExibidos] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setActiveTab("inicio");

    const fetchData = async () => {
      try {
        const [vendedoresRes, produtosRes] = await Promise.all([
          fetch(`${apiUrl}/vendedor`),
          fetch(`${apiUrl}/produto`)
        ]);

        const vendedoresData = await vendedoresRes.json();
        const produtosData = await produtosRes.json();

        setVendedores(vendedoresData);
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Só define falso quando ambas as chamadas terminarem
      }
    };

    fetchData();
  }, []);



  // Função para carregar mais vendedores
  const carregarMaisVendedores = () => {
    if (loadingMore || vendedoresExibidos >= vendedores.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVendedoresExibidos(prevState => prevState + 3);
      setLoadingMore(false);
    }, 1000);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      carregarMaisVendedores();
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />

      <div>
        {loading && (
          <div className="flex justify-center h-screen pb-64">
            <Loading />
          </div>
        )}
      </div>

      <div className='flex-1 p-4 overflow-y-auto' style={{ marginBottom: '4rem' }} onScroll={handleScroll}>
        <h1 className='text-xl font-semibold'>{getSaudacao()}, {user?.nome || "usuário"}!</h1>

        <div className="mt-2">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="w-full rounded-lg custom-swiper"
          >
            <SwiperSlide>
              <img src={banner01} alt="Banner 1" className='w-full h-full' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner02} alt="Banner 2" className='w-full h-full' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner03} alt="Banner 3" className='w-full h-full' />
            </SwiperSlide>
          </Swiper>
        </div>

        <div>
          <h1 className='text-base font-semibold pt-4 pb-2'>Lanches Recomendados</h1>
          <div className='flex px-1 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            {produtos.map((lanche) => (
              <div
                key={lanche._id}
                onClick={() => navigate(`/detalhesproduto/${lanche._id}`)}
                className="cursor-pointer"
              >
                <CardLanche
                  titulo={lanche.nome}
                  vendedor={lanche.vendedor?.nome || "Desconhecido"}
                  preco={lanche.preco.toFixed(2)}
                  imagem={lanche.imagem}
                />
              </div>
            ))}

          </div>

          <div className='pt-4'>
            <h1 className='text-base font-semibold pt-4 pb-2'>Vendedores</h1>
            <div className='flex flex-col gap-4'>
              {vendedores.slice(0, vendedoresExibidos).map((vendedor) => (
                <CardVendedor
                  key={vendedor.id}
                  nome={vendedor.nome}
                  telefone={vendedor.telefone}
                  status={vendedor.status}
                  imagemPerfil={vendedor.imagemPerfil}
                />
              ))}
            </div>

            {loadingMore && (
              <div className="flex justify-center mt-4">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>

      <NavInferior />
    </div>
  );
};

export default Home;
