import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializando com valores do localStorage, se existirem
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState<any>(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState<string | null>(storedToken);

  const login = (user: any, token: string) => {
    setUser(user);
    setToken(token);
    // Armazenar no localStorage para persistência
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Remover do localStorage ao deslogar
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
