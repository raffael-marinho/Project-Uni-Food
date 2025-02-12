import Navbar from '@/components/Navbar';
import NavInferior from '@/components/Navinferior';
import { useEffect, useState } from 'react';
import { useNav } from '@/context/nav-context';

const Home = () => {
  const [user, setUser] = useState<{ nome: string; telefone: string } | null>(null);

  const { setActiveTab } = useNav();

  useEffect(() => {
    // Obtendo o usuário do localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Definindo a aba ativa como "inicio"
    setActiveTab("inicio");
  }, []);

  return (
    <div className="home-container">
     <Navbar/>
      <h1>Bem-vindo, {user?.nome || "usuário"}!</h1>
      <p>Seu Numero é : {user?.telefone || "cidade desconhecida"}</p>
    <NavInferior/>
    </div>

  );
};

export default Home;
