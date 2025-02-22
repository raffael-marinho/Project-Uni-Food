import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  imagemPerfil?: string;
}

interface AuthContextProps {
  user: User | null;  
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;  
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};




export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);  
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prevUser) => {
      // Garantindo que prevUser tem o tipo correto
      if (prevUser) {
        return { ...prevUser, ...updatedUser };
      }
      return prevUser;
    });
    localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
