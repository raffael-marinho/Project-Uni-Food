import { useState } from "react";
import axios from "axios";
import apiUrl from "@/utils/Api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.ts"; 
import * as Yup from "yup";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast(); 


  const emailSchema = Yup.string()
    .email("Por favor, insira um e-mail válido.")
    .required("O e-mail é obrigatório.");

  const handleResetAndVerify = async () => {
    try {
      
      await emailSchema.validate(email);

      
      const resetResponse = await axios.post(`${apiUrl}/auth/reset-password`, { email });

      
      await new Promise((resolve) => setTimeout(resolve, 500));


      const verifyResponse = await axios.post(`${apiUrl}/auth/send-verification-email`, { email });

    
      toast({
        title: "Sucesso!",
        description: resetResponse.data.msg,
        variant: "default",
        duration: 2000,
        className: "translate-y-7",
      });

      toast({
        title: "Verificação enviada!",
        description: verifyResponse.data.msg,
        variant: "default",
        duration: 2000,
        className: "translate-y-7",
      });
    } catch (error : any) {
      if (error.name === "ValidationError") {
        toast({
          title: "Erro de validação",
          description : error.message,
          variant: "destructive",
          className: "translate-y-7",
        });
      } else {
        toast({
          title: "Erro!",
          description: "Erro ao processar a solicitação.",
          variant: "destructive",
          className: "translate-y-7",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center p-8">
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h2 className="text-2xl font-bold mb-10 text-center">Redefinição de Senha</h2>
        <p className="text-lg text-center font-semibold mb-8">
          Olá, insira seu e-mail para redefinir sua senha e receber um e-mail de verificação.
        </p>

        <div className="relative">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] placeholder-[#CE9E7E]
              bg-transparent text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
        </div>

        <Button onClick={handleResetAndVerify} className="mt-20 w-60 justify-center flex flex-col text-center">
          Redefinir Senha
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
