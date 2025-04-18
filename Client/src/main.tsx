import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastProvider } from "@/components/ui/toast"; // Importe o ToastProvider
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/auth-context';
import { NavProvider } from './context/nav-context';
import { VendedorProvider } from './context/vendedor-auth-context';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <VendedorProvider>
    <NavProvider>
    <ToastProvider> 
      <HashRouter>
      <App />
      </HashRouter>
      <Toaster /> 
    </ToastProvider>
    </NavProvider>
    </VendedorProvider>
    </AuthProvider>
  </StrictMode>
);
