import { CheckCircle } from "lucide-react";
import DivisaoReserva from "@/assets/imagens/DivisãoReserva.svg";

interface CardPedidoProps {
  nome: string;
  descricao: string;
  imagem: string;
  code: string;
  confirmado: boolean;
}

const CardPedido: React.FC<CardPedidoProps> = ({ nome, descricao, imagem, code, confirmado }) => {
  return (
    <div className="w-[360px] h-[108px] flex-shrink-0 bg-[#FFF6E0] rounded-lg flex items-center shadow-md overflow-hidden">
      
      {/* Imagem do produto no lado esquerdo */}
      <div className="w-24 h-full flex-shrink-0">
        <img
          src={imagem || "https://ui.shadcn.com/avatars/04.png"}
          alt={nome}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Nome e descrição */}
      <div className="flex flex-col justify-center px-4 w-40">
        <h3 className="text- font-bold text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
          {nome}
        </h3>
        <p className="text-xs text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
          {descricao}
        </p>
      </div>

      {/* Divisão SVG */}
      <div className="h-full flex items-center justify-center">
        <img src={DivisaoReserva} alt="Divisão" className="h-110% w-auto object-contain bg-[#FFF6E0]" />
      </div>

      {/* Ícone de confirmação OU código */}
      <div className="w-24 h-full flex justify-center items-center bg-[#FFF6E0]">
        {confirmado ? (
          <CheckCircle className="text-green-600 w-8 h-8" />
        ) : (
          <div className="text-center">
            <span className="text-xs font-semibold text-[#FF6A07]">code</span>
            <p className="text-xl font-bold text-[#FF6A07]">{code}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPedido;
