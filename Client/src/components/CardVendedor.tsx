import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { clock, whatsapp } from '../assets/imagens';

interface CardVendedorProps {
    nome: string;
    status: string;
    telefone: string;
    imagemPerfil: string;
}

const CardVendedor: React.FC<CardVendedorProps> = ({ nome, status, telefone, imagemPerfil }) => {

    const whatsappLink = `https://wa.me/${telefone}/?text=Ol%C3%A1,%20gostaria%20de%20fazer%20um%20pedido!%20${nome}`;

    return (
        <div className="h-28 w-full bg-[#FFF6E0] rounded-lg flex flex-row items-center">
           
            <div className="w-36 h-full flex justify-center items-center">
                <Avatar className="w-16 h-16 m-2 flex items-center justify-center">
                    <AvatarImage
                        src={imagemPerfil || "https://ui.shadcn.com/avatars/04.png"}
                        className="rounded-full w-full h-full object-cover"
                    />
                    <AvatarFallback className="items-center text-[12px] overflow-hidden text-ellipsis whitespace-nowrap w-8/12">{nome}</AvatarFallback>
                </Avatar>
            </div>

            <div className="flex flex-col items-start w-40 pl-2 pr-2">
                <h3 className="text-lg font-bold mt-2 w-36 overflow-hidden text-ellipsis whitespace-nowrap">
                    {nome}
                </h3>
                <div className="flex flex-row items-center w-full">
                    <img src={clock} alt="clock" className="w-4 h-4 mr-2" />
                    <p
                        className={`text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-36 ${
                            status === 'aberto' ? 'text-[#FF6A07]' : 'text-foreground' 
                        }`}>
                        {status}
                    </p>
                </div>
            </div>

            <div className="w-36 h-full border-l border-secondary flex justify-center items-center">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt="whatsapp" className="w-6 h-6 cursor-pointer" />
                </a>
            </div>
        </div>
    );
};

export default CardVendedor;
