import React, { useEffect, useState } from "react";
import { AppRoutes } from "./routes/routes";
import { StatusBar, Style } from "@capacitor/status-bar";
import { App as CapacitorApp } from "@capacitor/app";
import { Network } from "@capacitor/network";
import { useNavigate } from "react-router-dom"; // Substituindo useHistory por useNavigate

const MainApp: React.FC = () => {
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const navigate = useNavigate(); // Usando useNavigate ao invés de useHistory

    useEffect(() => {
        const setStatusBar = async () => {
            try {
                await StatusBar.setOverlaysWebView({ overlay: true });
                await StatusBar.setBackgroundColor({ color: "#F2E8CF" });
                await StatusBar.setStyle({ style: Style.Light });
            } catch (error) {
                console.error("Erro ao definir a Status Bar:", error);
            }
        };
    
        setStatusBar();
    
        const handleBackButton = () => {
            const currentPath = window.location.hash; // Usando hash para detectar URL atual
            const isRootPath =
                currentPath === "#/index" ||
                currentPath === "#/home" ||
                currentPath === "#/homevendedor" || // Verifica se está na página inicial
                currentPath === "#/no-internet"
    
            if (isRootPath) {
                CapacitorApp.exitApp(); // Sai do app se estiver na página inicial
            } else {
                window.history.back(); // Permite navegar para a página anterior
            }
        };
    
        // Aqui, a chamada para addListener retorna uma Promise, por isso devemos usar await
        const backButtonListener = CapacitorApp.addListener("backButton", handleBackButton);
    
        // Remover listener ao desmontar
        const removeListener = async () => {
            const listener = await backButtonListener; // Aguarde a resolução da Promise
            listener.remove(); // Agora podemos remover o listener
        };
    
        // Cleanup listener ao desmontar o componente
        return () => {
            removeListener(); // Chama a função para remover o listener
        };
    }, []);
    

    useEffect(() => {
        // Função para verificar a conexão de rede
        const checkNetwork = async () => {
            const status = await Network.getStatus();
            setIsOnline(status.connected);
        };
    
        // Verificar a conexão inicial
        checkNetwork();
    
        // Listener para mudanças no estado da rede
        const networkListener = Network.addListener("networkStatusChange", (status) => {
            setIsOnline(status.connected);
        });
    
        // Remover o listener corretamente
        const removeListener = async () => {
            const listener = await networkListener; // Aguarde a resolução da Promise
            listener.remove(); // Agora podemos remover o listener
        };
    
        return () => {
            removeListener(); // Chama a função para remover o listener
        };
    }, []);
    
    useEffect(() => {
        if (!isOnline) {
            navigate("/no-internet"); // Redireciona para a tela de "sem internet" usando navigate
        }
    }, [isOnline, navigate]);

    return <AppRoutes />;
};

export default MainApp;
