import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Search, User } from "lucide-react";
import { useNav } from "@/context/nav-context";

type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
};

const tabs: Tab[] = [
  { id: "inicio", label: "Início", icon: Home, route: "/home" },
  { id: "reservas", label: "Reservas", icon: Calendar, route: "/reservas" },
  { id: "pesquisar", label: "Pesquisar", icon: Search, route: "/pesquisar" },
  { id: "perfil", label: "Perfil", icon: User, route: "/perfil" },
];

const NavInferior: React.FC = () => {
  const { activeTab } = useNav(); // 🔹 Obtém a aba ativa do contexto

  return (
    <nav className="bg-[#FFF6E0] fixed bottom-0 left-0 z-50 w-full h-16">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id; // 🔹 Verifica se a aba está ativa pelo estado global

          return (
            <NavLink
              key={tab.id}
              to={tab.route}
              className={`flex flex-col items-center justify-center px-5 ${
                isActive ? "text-primary" : "text-[#DBBDAA] opacity-60"
              }`}
            >
              <Icon
                size={28}
                strokeWidth={2}
                className={isActive ? "text-primary" : "text-[#DBBDAA] opacity-50"}
              />
              <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-[#DBBDAA] opacity-60"}`}>
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavInferior;
