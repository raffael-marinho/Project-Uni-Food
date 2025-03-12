import { Button } from "@/components/ui/button";



import { useNavigate } from "react-router-dom";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ImgUser } from "@/assets/imagens";
import { useVendedor } from "@/context/vendedor-auth-context";
import NavBarVenda from "@/components/NavBarVenda";

const PerfilVendedor = () => {
    const { vendedor } = useVendedor(); 
    const { logout } = useVendedor();
    const navigate = useNavigate(); // Hook para navegação

  

    // Função para sair e redirecionar para login
    const handleLogout = () => {
        logout ();
        navigate("/"); 
    };

    return (
        <div className="flex flex-col h-screen">
            <NavBarVenda />

            <div className="flex flex-col items-center justify-center h-4/6 w-full">
                    <Avatar className="w-32 h-32 m-2 flex items-center justify-center mb-9">
                        <AvatarImage
                            src={vendedor?.imagemPerfil || ImgUser}
                            className="rounded-full w-full h-full object-cover"
                        />
                    </Avatar>
                <h1 className="text-3xl  font-bold mb-5 overflow-hidden text-ellipsis whitespace-nowrap w-3/4 text-center">{vendedor?.nome || "Usuário"}</h1>
                <div>
                    <Button
                        variant={"link"}
                        className="text-xl w-60 flex text-center mb-2 font-semibold"
                        onClick={() => navigate(`/editarperfilvendedor/${vendedor?.id}`)} 
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

        </div>
    );
};

export default PerfilVendedor;
