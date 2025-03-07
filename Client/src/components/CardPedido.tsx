import { CheckCircle, XCircle } from "lucide-react";
import DivisaoReserva from "@/assets/imagens/DivisãoReserva.svg";

interface CardPedidoProps {
  nome: string;
  descricao: string;
  imagem: string;
  code: string;
  status: string;  // Alterando para somente usar o status como parâmetro

}

const CardPedido: React.FC<CardPedidoProps> = ({ nome, descricao, imagem, code, status }) => {
  return (
    <div className="w-full h-[108px] flex-shrink-0 bg-[#FFF6E0] rounded-lg flex items-center shadow-md overflow-hidden">
      
      {/* Imagem do produto no lado esquerdo */}
      <div className="w-24 h-full flex-shrink-0">
        <img
          src={imagem }
          alt={nome}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Nome e descrição */}
      <div className="flex flex-col justify-center px-4 w-2/4">
        <h3 className="text-sm font-bold text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
          {nome}
        </h3>
        <p className="text-xs text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
          {descricao}
        </p>
      </div>

      {/* Divisão SVG */}
      <div className="h-full flex items-center justify-center">
        <img src={DivisaoReserva} alt="Divisão" className="h-full w-auto min-w-[10px] object-contain bg-[#FFF6E0]" />
      </div>

      {/* Ícone de confirmação OU código */}
      <div className="w-24 h-full flex items-center justify-center bg-[#FFF6E0]">
        {status === "Cancelado" ? (
          <div className="flex flex-col items-center justify-center h-full">
            <XCircle className="text-red-600 w-8 h-8" />
          </div>
        ) : status === "Finalizado" ? (
          <CheckCircle className="text-green-600 w-8 h-8" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-sm font-semibold text-primary">Code</span>
            <p className="text-xl font-bold text-primary">{code}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPedido;
