import { createContext, useContext, useState } from "react";

type NavContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error("useNav deve ser usado dentro de NavProvider");
  return context;
};
