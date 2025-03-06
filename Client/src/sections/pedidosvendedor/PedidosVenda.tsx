import NavBarVenda from "@/components/NavBarVenda";
import { useNav } from "../../context/nav-context";
import { useEffect } from "react";
import CardPedidoVendas from "@/components/cardPedidoVenda";

const PedidosVendedor = () => {    
    const { setActiveTab } = useNav();

    useEffect(() => {
        setActiveTab("pedidos");
    }, []);

    
    const pedidos = [
        { nome: "Pedro", code: "40", statusPedido: "Em preparo", },
        { nome: "João", code: "35", statusPedido: "Finalizado", },
    ];

    return (
        <div className="flex flex-col h-screen">
            <NavBarVenda />
            <div className="flex flex-col  p-5  text-base font-semibold pb-2">
              <div>
                <h1 className="text-2xl mb-8  font-semibold">Aqui estão os seus pedidos</h1>
                <div className="flex flex-col gap-4">
                    {pedidos.map((pedido, index) => (
                        <CardPedidoVendas
                            key={index} 
                            nome={pedido.nome} 
                            code={pedido.code} 
                            confirmado={pedido.statusPedido === "Finalizado"}
                        />
                    ))}
                </div>
              </div>
              
            </div>
          
        </div>
    );
};

export default PedidosVendedor;
