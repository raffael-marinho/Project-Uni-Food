import React from "react";
import { useNavigate } from "react-router-dom";
import LogoMobile from "@/assets/imagens/LogoMobile.svg";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVendedor } from "@/context/vendedor-auth-context";

const NavBarVenda: React.FC = () => {
  const { logout } = useVendedor();
  const handleLogout = () => {
    logout(); // Chama a função de logout
    window.location.href = "/login"; // Redireciona o usuário para a página de login
  };
  return (
    <nav className="bg-background sticky left-0 top-0 w-full shadow-md z-50 pt-5">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <SheetDemo handleLogout={handleLogout} />
        <div className="flex-1 flex justify-center">
          <img src={LogoMobile} alt="Logo" className="h-12 w-12" />
        </div>
        <button
          className="p-2 rounded-full hover:bg-[#FAAB35] hover:text-white duration-200"
          aria-label="Notificações"
        >
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};


  interface SheetDemoProps {
    handleLogout: () => void; // Definindo a tipagem da prop
  }
  const SheetDemo: React.FC<SheetDemoProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger className="hover:bg-[#FAAB35] hover:text-white duration-200 " asChild>
        <Button variant="ghost" className="w-12 h-12 ">
          <Menu className="w-6 h-6 " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-[#FFF6E0]">
        <SheetHeader>
          <SheetTitle className="text-foreground ">Menu</SheetTitle>
        </SheetHeader>
 
        <div className="mt-8 space-y-4">
        <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
            onClick={() => navigate("/homevendedor")}
          >
            Inicio
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
          >
            Editor Perfil
          </Button>
          <Button
  variant="ghost"
  className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
  onClick={() => navigate("/PedidosVendedor")}
>
            Pedidos
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavBarVenda;