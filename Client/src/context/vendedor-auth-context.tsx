import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Vendedor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  descricao: string;
  imagemPerfil?: string;
  status: 'Aberto' | 'Fechado';
  chavePix?: string;
  imagemCapa?: string;
}

interface VendedorContextProps {
  vendedor: Vendedor | null;
  loading: boolean;
  isAuthVendedor: boolean;
  login: (vendedor: Vendedor, token: string) => void;
  logout: () => void;
  updateVendedor: (updatedVendedor: Partial<Vendedor>) => void;
  token: string | null;
}

const VendedorContext = createContext<VendedorContextProps>({} as VendedorContextProps);

export const useVendedor = () => {
  const context = useContext(VendedorContext);
  if (!context) {
    throw new Error("useVendedor deve ser usado dentro de um VendedorProvider");
  }
  return context;
};

export const VendedorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vendedor, setVendedorState] = useState<Vendedor | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVendedor = localStorage.getItem("vendedor");
    const storedToken = localStorage.getItem("token");

    if (storedVendedor && storedToken) {
      setVendedorState(JSON.parse(storedVendedor));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (vendedor: Vendedor, token: string) => {
    setVendedorState(vendedor);
    setToken(token);
    localStorage.setItem("vendedor", JSON.stringify(vendedor));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setVendedorState(null);
    setToken(null);
    localStorage.removeItem("vendedor");
    localStorage.removeItem("token");
  };

  const updateVendedor = (updatedVendedor: Partial<Vendedor>) => {
    setVendedorState((prevVendedor) => {
      if (prevVendedor) {
        const updated = { ...prevVendedor, ...updatedVendedor };
        localStorage.setItem("vendedor", JSON.stringify(updated));
        return updated;
      }
      return prevVendedor;
    });
  };

  const isAuthVendedor = !!vendedor && !!token; 

  return (
    <VendedorContext.Provider value={{ vendedor, token, loading, login, logout, updateVendedor, isAuthVendedor}}>
      {children}
    </VendedorContext.Provider>
  );
};
