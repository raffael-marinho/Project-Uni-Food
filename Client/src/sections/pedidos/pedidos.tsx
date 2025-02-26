import { useAuth } from "@/context/auth-context";
import NavBar from "../../components/Navbar"
import NavInferior from "../../components/Navinferior"
import { useNav } from "../../context/nav-context"
import { useEffect } from "react";

const Pedidos = () => {    
    const { setActiveTab } = useNav();
    const {user} = useAuth();
    useEffect(() => {
        setActiveTab("pedidos");
    }, []);
    return (
        <div className="flex flex-col h-screen">
            <NavBar/>
            <div className="flex flex-col items-center p-5 mt-28">
                <h1 className="text-3xl font-bold mb-4">Reservas</h1>
                <p>Bem-vindo, {user?.nome}</p>
            </div>
            <NavInferior/>
        </div>
    );
};

export default Pedidos;