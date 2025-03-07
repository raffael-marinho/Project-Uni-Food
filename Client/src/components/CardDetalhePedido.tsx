import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PedidoCardProps {
  pedido: { itens: { nome: string; preco: number }[]; total: number };
  cliente: string;
  codigo: string;
  onClose: () => void;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, cliente, codigo, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
      onClick={onClose}
    >
      <Card
        className="w-96 bg-white rounded-2xl shadow-lg p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Título */}
        <h2 className="text-primary text-xl font-bold text-center mb-4">Pedidos</h2>

        {/* Lista de Itens do Pedido */}
        <CardContent className="space-y-4">
          {pedido.itens.map((item, index) => (
            <div key={index} className="flex justify-between text-brown-700">
              <span>{item.nome}</span>
              <span>R$ {item.preco.toFixed(2)}</span>
            </div>
          ))}

          {/* Total */}
          <div className="border-t border-gray-400 mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>R$ {pedido.total.toFixed(2)}</span>
          </div>

          {/* Cliente e Código */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{cliente}</span>
              <span className="bg-primary text-white px-3 py-1 rounded-md text-sm">code {codigo}</span>
            </div>
          </div>

          {/* Botão de Confirmação */}
          <Button className="w-full mt-6 bg-primary hover:bg-primary text-white font-semibold py-2 rounded-lg">
            Confirmar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PedidoCard;