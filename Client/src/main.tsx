import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastProvider } from "@/components/ui/toast"; // Importe o ToastProvider
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/auth-context';
import { NavProvider } from './context/nav-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <NavProvider>
    <ToastProvider> 
      <App />
      <Toaster /> 
    </ToastProvider>
    </NavProvider>
    </AuthProvider>
  </StrictMode>
);
