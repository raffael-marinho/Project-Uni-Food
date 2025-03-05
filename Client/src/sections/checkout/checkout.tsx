import Navbar from "@/components/Navbar";
import NavInferior from "@/components/Navinferior";
import { useNav } from "@/context/nav-context";
import { useEffect } from "react";

const Checkout = () => {
    const { setActiveTab } = useNav();
    
      useEffect(() => {
            setActiveTab("pedidos"); 
        }, []); 
   
     return (
       <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full">
         <div className="w-80 h-3/5 bg-[#F0E0B8] mb-24 rounded-xl">
          <h1 className="text-3xl text-center text-primary font-semibold mt-8">Pedido</h1>
          <div className="space-y-4 mt-4">

      <div className="flex justify-center w-full">
        <div className="flex justify-between items-center w-4/5 border-b pb-2 border-primary">
         <span className="text-lg">Coxinha x10</span>
        <span className="text-lg">R$ 5.00</span>
         </div>
        </div>

        <div className="flex justify-center w-full">
        <div className="flex justify-between items-center w-4/5">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">R$ 50.00</span>
        </div>
        </div>
        
          </div>
         </div>
        </div>
        <NavInferior />
       </div>
     )
}

export default Checkout;

