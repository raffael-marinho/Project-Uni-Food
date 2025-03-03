interface CardProdutoProps {
    nome: string;
    descricao: string;
    imagem: string;
    valor: string;
  }
  
  const CardProduto: React.FC<CardProdutoProps> = ({ nome, descricao, imagem, valor }) => {
    return (
      <div className="w-full h-[108px] flex-shrink-0 bg-[#FFF6E0] rounded-lg flex items-center shadow-md overflow-hidden">
        {/* Imagem do produto no lado esquerdo */}
        <div className="w-24 h-full flex-shrink-0">
          <img
            src={imagem || "https://ui.shadcn.com/avatars/04.png"}
            alt={nome}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
  
        {/* Nome e descrição */}
        <div className="flex flex-col justify-center px-4 w-2/4">
          <h3 className="text-xl font-bold mb-6 text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
            {nome}
          </h3>
          <p className="text-xs text-tertiary mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {descricao}
          </p>
        </div>
  
        {/* Valor do produto */}
        <div className="w-10/12 mt-4 pb-2">
          <p className="text-lg font-semibold text-center">R$ {valor}</p>
        </div>
      </div>
    );
  };
  
  export default CardProduto;