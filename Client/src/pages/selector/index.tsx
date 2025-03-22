import { chef, client } from "@/assets/imagens";
import { useNavigate } from "react-router-dom";

function Selector() {
    const navigate = useNavigate();

    return (
     <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold">Você é ?</h1>
        <div className="flex gap-8 m-11 flex-wrap">

        <div className="flex flex-col items-center" onClick={() => navigate("/logincliente") }>
        <div className="flex flex-col items-center justify-center w-[110px] h-[110px] bg-[#ff6906] rounded-[61px]">
        <img src={client} alt="Cliente" className="w-20 h-20" />
        </div>
        <h1 className="text-xl font-medium mt-2">Cliente</h1>
        </div>

        <div className="flex flex-col items-center" onClick={() => navigate("/loginvenda") }>
        <div className="flex flex-col items-center justify-center w-[110px] h-[110px] bg-[#ff6906] rounded-[61px]">
        <img src={chef} alt="Vendedor" className="w-20 h-20" />
        </div>
        <h1 className="text-xl font-medium mt-2">Vendedor</h1>
        </div>

        </div>
     </div>
    )
}

export default Selector;