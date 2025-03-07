import { useState } from "react";
import { CheckCircle } from "lucide-react";
import DivisaoReserva from "@/assets/imagens/DivisãoReserva.svg";
import PedidoCard from "../components/CardDetalhePedido";

interface CardPedidoVendasProps {
  nome: string;
  code: string;
  confirmado: boolean;
  pedido: { itens: { nome: string; preco: number }[]; total: number };
}

const CardPedidoVendas: React.FC<CardPedidoVendasProps> = ({ nome, code, confirmado, pedido }) => {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <div
        className="w-full h-[108px] flex-shrink-0 bg-[#FFF6E0] rounded-lg flex items-center shadow-md overflow-hidden border border-[#E5C690] cursor-pointer"
        onClick={() => setModalAberto(true)}
      >
        {/* Nome do Cliente */}
        <div className="flex-1 px-4 text-brown-800 font-semibold text-lg">{nome}</div>

        {/* Divisão Central (Imagem) */}
        <div className="h-full flex items-center justify-center">
          <img src={DivisaoReserva} alt="Divisão" className="h-full w-auto object-contain bg-[#FFF6E0]" />
        </div>

        {/* Código do Pedido ou Confirmação */}
        <div className="w-24 flex flex-col items-center justify-center h-full bg-[#FFF6E0]">
          {confirmado ? (
            <CheckCircle className="text-green-600 w-8 h-8" />
          ) : (
            <>
              <span className="text-xs font-semibold text-[#FF6A07]">code</span>
              <p className="text-xl font-bold text-[#FF6A07]">{code}</p>
            </>
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {modalAberto && (
        <PedidoCard
          pedido={pedido}
          cliente={nome}
          codigo={code}
          onClose={() => setModalAberto(false)}
        />
      )}
    </>
  );
};

export default CardPedidoVendas;