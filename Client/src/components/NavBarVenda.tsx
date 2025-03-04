import React from "react";
import LogoMobile from "@/assets/imagens/LogoMobile.svg";
import { Bell, Menu } from "lucide-react"; // Importe o ícone de menu
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBarVenda: React.FC = () => {
  return (
    <nav className="bg-background sticky left-0 top-0 w-full shadow-md z-50 pt-5">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Botão de Menu */}
        <SheetDemo />

        {/* Logo Centralizada */}
        <div className="flex-1 flex justify-center">
          <img src={LogoMobile} alt="Logo" className="h-12 w-12" />
        </div>

        {/* Ícone de Notificações */}
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

const SheetDemo: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="hover:bg-[#FAAB35] hover:text-white duration-200 " asChild>
        <Button variant="ghost" className="w-12 h-12 ">
          <Menu className="w-6 h-6 " /> {/* Ícone de menu */}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-[#FFF6E0]">
        <SheetHeader>
          <SheetTitle className="text-foreground ">Menu</SheetTitle>
        </SheetHeader>

        {/* Conteúdo do Menu */}
        <div className="mt-8 space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
          >
            Editor Perfil
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
          >
            Pedidos
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left hover:bg-[#FAAB35] hover:text-white"
          >
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavBarVenda;
