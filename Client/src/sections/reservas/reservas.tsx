import NavBar from "../../components/Navbar"
import NavInferior from "../../components/Navinferior"
import { useNav } from "../../context/nav-context"
import { useEffect, useState } from "react";

const Reservas = () => {    
    const { setActiveTab } = useNav();
    const [user, setUser] = useState<Record<string, any> | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    
        setActiveTab("reservas");
    }, []);
    return (
        <div >
            <NavBar/>
            <div className="flex flex-col items-center h-screen p-5">
                <h1 className="text-3xl font-bold mb-4">Reservas</h1>
            </div>
            <NavInferior/>
        </div>
    );
};

export default Reservas;