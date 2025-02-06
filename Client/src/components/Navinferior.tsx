import React, { useState } from "react";
import  home from "@/assets/imagens/home.svg";
import  calendar from "@/assets/imagens/calendar.svg";
import  lupa from "@/assets/imagens/lupa.svg";
import  usuario from "@/assets/imagens/usuario.svg";


type Tab = {
  id: string;
  label: string;
  icon: string;
};

const NavInferior: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  const tabs: Tab[] = [
    { id: "inicio", label: "Início", icon: home },
    { id: "reservas", label: "Reservas", icon: calendar },
    { id: "pesquisar", label: "Pesquisar", icon: lupa },
    { id: "perfil", label: "Perfil", icon: usuario },
  ];

  return (
    <nav className="bg-[#FFF5E5] fixed bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center justify-center px-5 group"
          >
            <img
              src={tab.icon}
              alt={tab.label}
              className={activeTab === tab.id ? "filter brightness-0 invert" : "bg-transparent"}
            />
            <span
              className={`text-sm font-bold ${
                activeTab === tab.id ? "text-[#FAAB35]" : "text-[#D3A88C]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavInferior;