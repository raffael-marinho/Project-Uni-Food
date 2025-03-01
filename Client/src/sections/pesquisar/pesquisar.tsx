import NavBar from "../../components/Navbar"
import NavInferior from "../../components/Navinferior"
import { useNav } from "../../context/nav-context"
import { useEffect } from "react";
import CardPesquisa from "../../components/CardPesquisa"; 
import BarraPesque from "../../components/BarraPesque";

const Pesquisar = () => {
    const { setActiveTab } = useNav();

    useEffect(() => {
        setActiveTab("pesquisar");
      }, []);

    const Pesquisar = [
        { nome: "Hambúrguer", imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg", valor: " 7.50", descricao: "Delicioso hambúrguer artesanal" },
        { nome: "Coxinha", imagem: "https://i0.wp.com/canaldareceita.com.br/wp-content/uploads/2024/09/COXINHA-FIT.jpg?fit=1000%2C600&ssl=1", valor: " 3.50", descricao: "Coxinha de frango com massa crocante" },
    ];
      
    return (
       <div className="flex flex-col h-screen">
            <NavBar />
            <div className="mt-8 mb-5">
                <BarraPesque />
            </div>
            <div className="flex flex-col  p-5  text-base font-semibold pb-2">
                <div className="flex flex-col gap-4">

                    {Pesquisar.map((pesquisa, index) => (
                        <CardPesquisa 
                            key={index} 
                            nome={pesquisa.nome} 
                            imagem={pesquisa.imagem} 
                            descricao={pesquisa.descricao}
                            valor={pesquisa.valor}
                        />
                    ))}
                 </div>
             </div>
            <NavInferior />
        </div>
    )
}

export default Pesquisar