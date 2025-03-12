import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NavInferior from "@/components/Navinferior";
import { useNav } from "@/context/nav-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import error from "@/assets/animações/error.json";

const Error = () => {
    const { setActiveTab } = useNav();
    const navigate = useNavigate(); 
    const [isLeaving, setIsLeaving] = useState(false); 

    useEffect(() => {
        setActiveTab("pedidos"); 
        
        const timer = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => {
                navigate("/home", { replace: true }); 
            }, 500); 
        }, 4000);

        return () => clearTimeout(timer);
    }, []); 

    return (
        <motion.div 
            className="flex flex-col h-screen"
            initial={{ opacity: 1, scale: 1 }}  
            animate={isLeaving ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.5 }}  
            transition={{ duration: 0.5, ease: "easeOut" }} 
        >
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-80 h-3/5 bg-primary mb-24 rounded-xl">
                <h1 className="text-3xl font-semibold text-white text-center mt-9">
                  Ops.. Deu erro no <br /> seu pedido
                </h1>
                <div className="flex justify-center items-center h-full">
                  <Lottie 
                    animationData={error} 
                    loop={false} 
                    autoplay={true} 
                    className="w-56 h-56 mb-28"
                  />
                </div>
              </div>
            </div>
            <NavInferior />
        </motion.div>
    );
};

export default Error;
