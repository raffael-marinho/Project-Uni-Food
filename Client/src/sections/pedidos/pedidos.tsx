import NavBar from "../../components/Navbar";
import NavInferior from "../../components/Navinferior";
import { useNav } from "../../context/nav-context";
import { useEffect } from "react";
import CardPedido from "../../components/CardPedido"; 

const Pedidos = () => {    
    const { setActiveTab } = useNav();

    useEffect(() => {
        setActiveTab("pedidos");
    }, []);

    
    const pedidos = [
        { nome: "Hambúrguer", imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg", code: "40", statusPedido: "Em preparo", descricao: "Delicioso hambúrguer artesanal" },
        { nome: "Coxinha", imagem: "https://i0.wp.com/canaldareceita.com.br/wp-content/uploads/2024/09/COXINHA-FIT.jpg?fit=1000%2C600&ssl=1", code: "35", statusPedido: "Finalizado", descricao: "Coxinha de frango com massa crocante" },
    ];

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col  p-5  text-base font-semibold pb-2">
                {/* <h1 className="text-3xl font-bold mb-4">Pedidos</h1> */}
            
                <p className="text-lg">Aqui estão os seus pedidos:</p>
                <div className="w-full max-w-md space-y-4 mt-6">
                    {pedidos.map((pedido, index) => (
                        <CardPedido 
                            key={index} 
                            nome={pedido.nome} 
                            imagem={pedido.imagem} 
                            descricao={pedido.descricao}
                            code={pedido.code} 
                            confirmado={pedido.statusPedido === "Finalizado"}
                        />
                    ))}
                </div>
            </div>
            <NavInferior />
        </div>
    );
};

export default Pedidos;
