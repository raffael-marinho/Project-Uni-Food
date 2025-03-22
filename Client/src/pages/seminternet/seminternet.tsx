import { Wifi } from "lucide-react";

const SemInternet = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-screen">
            <Wifi className="w-32 h-32 pb-9" />
            <h1 className="text-2xl font-semibold w-3/4">Sem Conexão com a Internet</h1>
            <p className="text-lg w-3/4 mt-9">Feche o aplicativo e conecte-se a uma rede com internet e tente novamente</p>
        </div>
    )

};
export default SemInternet;