interface CardMaisVendidoProps {
    nome: string;
    descricao: string;
    imagem: string;
    valor: string;
  }
  
  const CardMaisVendido: React.FC<CardMaisVendidoProps> = ({ nome, descricao, imagem, valor }) => {
    return (
      <div className="h-44 w-36 bg-[#FFF6E0] rounded-lg flex flex-col items-center shadow-md overflow-hidden">
        {/* Imagem do produto no topo */}
        <div className="w-full h-24 overflow-hidden rounded-t-lg">
          <img
            src={imagem || "https://ui.shadcn.com/avatars/04.png"}
            alt={nome}
            className="h-full w-full object-cover"
          />
        </div>
  
        {/* Nome e descrição */}
        <div className="flex flex-col items-start w-full pl-2 pr-2">
          <h3 className="text-sm font-bold mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {nome}
          </h3>
          <p className="text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {descricao}
          </p>
        </div>
  
        {/* Valor do produto */}
        <div className="w-10/12 mt-2 pb-2 border-t border-foreground">
          <p className="text-lg font-semibold text-center">R$ {valor}</p>
        </div>
      </div>
    );
  };
  
  export default CardMaisVendido;