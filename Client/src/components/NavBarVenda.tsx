import React from "react";
import LogoMobile from "@/assets/imagens/LogoMobile.svg";
import { Bell } from "lucide-react";
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
    <nav className="bg-background sticky left-0 top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Botão de Menu */}
        <SheetDemo />

        {/* Logo Centralizada */}
        <div className="flex-1 flex justify-center">
          <img src={LogoMobile} alt="Logo" className="h-10 w-10" />
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
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-12 h-12">
          < Menu className="w-12 h-12" /> 
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navegue pelas opções do menu.
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavBarVenda;
