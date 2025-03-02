import React from "react";
import NavBarVenda from "../../components/NavBarVenda";
import { Button } from "@/components/ui/button";
import capa from "@/assets/imagens/capa.jpg";
import { CirclePlus } from 'lucide-react';

const VendedorPerfil: React.FC = () => {
  return (
    <div className="bg-[#FCE7D5] min-h-screen flex flex-col items-center">
      <NavBarVenda />
      
      {/* Capa do Vendedor */}
      <div className="relative w-full h-40 md:h-56 bg-cover bg-center" style={{ backgroundImage: `url(${capa})` }}>
        {/* Foto de Perfil */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24md:w-24 md:h-24 bg-primary rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fbKWx3FrfmwLauu0iXO4wY8VgjAcngaKqA&s" alt="Foto de Perfil" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Nome do Vendedor */}
      <div className="mt-12 text-center">
        <h1 className="text-xl font-bold text-tertiary" >Hamburguer Fast</h1>
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
