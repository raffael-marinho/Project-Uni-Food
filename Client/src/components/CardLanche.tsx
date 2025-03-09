interface CardLancheProps {
    titulo: string;
    vendedor: string;
    preco: string;
    imagem: string;
    quantidade: number;
}

const CardLanche: React.FC<CardLancheProps> = ({ titulo, vendedor, preco, imagem, quantidade }) => {
    return (
        <div>
       
        <div className="h-44 w-36 bg-[#FFF6E0] rounded-lg  flex flex-col items-center">
            <div className="w-full h-24 overflow-hidden rounded-t-lg">
                <img src={imagem} alt={titulo} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col items-start w-full pl-2 pr-2">
    <h3 className="text-sm font-bold mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">{titulo}</h3>
    <p className="text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap">{vendedor}</p>
            </div>
            
            <div className="w-10/12 mt-4 pb-2 border-t border-foreground">
            {quantidade > 0 ? (
                        <p className="text-lg font-semibold text-center">R$ {preco}</p>
                    ) : (
                        <p className="text-lg font-semibold text-center text-primary">Esgotado</p> // Exibe "Esgotado" se a quantidade for 0
                    )}
        
            </div>
        </div>
        </div>
    );
};

export default CardLanche;