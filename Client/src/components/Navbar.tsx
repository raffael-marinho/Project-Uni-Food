import React from "react";
import  LogoMobile from "@/assets/imagens/LogoMobile.svg";
import Shoppingcart from "@/assets/imagens/shoppingcart.svg";


const Navbar: React.FC = () => {
  return (
    <nav className="bg-background sticky left-0 top-0 w-full shadow-md z-50 pt-5"> {/* Cor de fundo bege claro */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
       

        {/* Logo */}
        <div className="w-10 h-10 ml-8 flex-shrink-0">
          <img src={LogoMobile} alt="Logo" />
        </div>

        {/* Ícone do carrinho */}
        <div>
          <button className="text-2xl gap-2 mx-5 hover:bg-[#FAAB35] hover:text-white rounded-full p-2 duration-200">
            <img src={Shoppingcart} alt="Carrinho" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
