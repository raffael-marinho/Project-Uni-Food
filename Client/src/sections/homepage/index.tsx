import Navbar from '@/components/Navbar';
import NavInferior from '@/components/Navinferior';
import { useEffect } from 'react';
import { useNav } from '@/context/nav-context';
import { banner01, banner02, banner03 } from '@/assets/imagens';
import getSaudacao from '@/utils/saudacao';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useAuth } from '@/context/auth-context';
const Home = () => {
  const { user } = useAuth();
  const { setActiveTab } = useNav();

  useEffect(() => {
    setActiveTab("inicio");
  }, []);

  return (
    <div >
      <Navbar />
      <div className='flex flex-col justify-center p-3 h-svh mt-8'>
        <h1 className='text-xl font-semibold'>{getSaudacao()}, {user?.nome || "usuário"}!</h1>
        
        <div className="mt-2">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="w-full rounded-lg shadow-lg custom-swiper"
          >
            <SwiperSlide>
              <img src={banner01} alt="Banner 1" className='w-full h-full' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner02} alt="Banner 2" className='w-full h-full' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner03} alt="Banner 3" className='w-full h-full'/>
            </SwiperSlide>
          </Swiper>
        </div>

       
        <div>
          <h1 className='text-lg font-semibold pt-4'>Lanches Mais Pedidos</h1>
          <img src={banner02} alt="Banner 2" className="w-full h-full " />
          <img src={banner02} alt="Banner 2" className="w-full h-full " />
          <img src={banner02} alt="Banner 2" className="w-full h-full " />
        </div>
      </div>
      <NavInferior />
    </div>
  );
};

export default Home;
