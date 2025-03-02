import { Button } from "@/components/ui/button";
import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ImgUser } from "@/assets/imagens";

const Perfil = () => {
    const { setActiveTab } = useNav();
    const { user } = useAuth(); 
    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {

        setActiveTab("perfil");
    }, []);

    // Função para sair e redirecionar para login
    const handleLogout = () => {
        logout ();
        navigate("/"); 
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBar />

            <div className="flex flex-col items-center justify-center h-4/6 w-full">
                    <Avatar className="w-32 h-32 m-2 flex items-center justify-center mb-9">
                        <AvatarImage
                            src={ImgUser}
                            className="rounded-full w-full h-full object-cover"
                        />
                    </Avatar>
                <h1 className="text-3xl  font-bold mb-5 overflow-hidden text-ellipsis whitespace-nowrap w-3/4 text-center">{user?.nome || "Usuário"}</h1>
                <div>
                    <Button
                        variant={"link"}
                        className="text-xl w-60 flex text-center mb-2 font-semibold"
                        onClick={() => navigate(`/editarperfil/${user?.id}`)} 
                    >
                        Editar Perfil
                    </Button>

                    <Button
                        variant={"link"}
                        className="text-xl w-60 flex text-center gap-7 font-semibold"
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
