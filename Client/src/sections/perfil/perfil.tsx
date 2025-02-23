import { Button } from "@/components/ui/button";
import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

const Perfil = () => {
    const { setActiveTab } = useNav();
    const { user } = useAuth(); 
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {

        setActiveTab("perfil");
    }, []);

    // Função para sair e redirecionar para login
    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove o usuário do localStorage
        navigate("/logincliente"); // Redireciona para a tela de login
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBar />

            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold mb-4">{user?.nome || "Usuário"}</h1>
                <div>
                    <Button
                        variant={"link"}
                        className="text-lg w-60 flex items-center gap-2 font-semibold"
                        onClick={() => navigate(`/editarperfil/${user?.id}`)} 
                    >
                        Editar Perfil
                    </Button>

                    <Button
                        variant={"link"}
                        className="text-lg w-60 flex items-center gap-2 font-semibold"
                        onClick={handleLogout}
                    >
                        Sair
                    </Button>
                </div>
            </div>

            <NavInferior />
        </div>
    );
};

export default Perfil;
