import NavBar from "../../components/Navbar"
import NavInferior from "../../components/Navinferior"
import { useNav } from "../../context/nav-context"
import { useEffect } from "react";
import { useAuth } from "../../context/auth-context";

const Pesquisar = () => {
    const { setActiveTab } = useNav();
    const { user } = useAuth();

    useEffect(() => {
        setActiveTab("pesquisar");
      }, []);
      
    return (
        <div>
            <NavBar/>
            <div className="flex flex-col items-center mt-28">
                <h1 className="text-3xl font-bold mb-4">Pesquisar</h1>
                <p>Bem-vindo, {user?.nome}</p>
            </div>
            <NavInferior/>
        </div>
    )
}

export default Pesquisar