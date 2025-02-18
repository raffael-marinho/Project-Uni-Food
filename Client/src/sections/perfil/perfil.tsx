import NavBar from "../../components/Navbar"
import NavInferior from "../../components/Navinferior"
import { useNav } from "../../context/nav-context"
import { useEffect, useState } from "react";


const Perfil = () => {
    const { setActiveTab } = useNav();
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        // Obtendo o usuário do localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    
        setActiveTab("perfil");
      }, []);

    return (
        <div>
            <NavBar/>

            <div className="flex flex-col items-center h-screen p-5">
                <h1 className="text-3xl font-bold mb-4">Perfil do Usuário</h1>
                <p className="text-lg">Nome: {user?.nome}</p>
                <p className="text-lg">Telefone: {user?.telefone}</p>
            </div>

            <NavInferior/>
        </div>
    );
}

export default Perfil;