import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import slides from "@/assets/slides";
import "swiper/swiper-bundle.css";


function IntroScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null); 


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full max-w-md"
        onSwiper={(swiper) => (swiperRef.current = swiper)} 
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center text-center px-6 py-8">
              <img src={slide.image} alt={slide.title} className="w-40 h-40 mb-4" />
              <h1 className="text-4xl mb-2">{slide.title}</h1>
              <p className="text-lg text-justify mt-4">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex gap-2 my-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full m-2 ${index === activeIndex ? "bg-orange-500" : "bg-orange-800"}`}
          />
        ))}
      </div>
      <Button
        className="w-3/4"
        onClick={() => {
          if (activeIndex === slides.length - 1) {
            console.log("Finalizado!"); 
          } else {
            swiperRef.current?.slideNext(); // Avança para o próximo slide
          }
        }}
      >
        {activeIndex === slides.length - 1 ? "Começar" : "Próximo"}
      </Button>
      <Button className="mt-4" variant={"link"}>Pular Introdução</Button>
    </div>
  );
}
export default IntroScreen;