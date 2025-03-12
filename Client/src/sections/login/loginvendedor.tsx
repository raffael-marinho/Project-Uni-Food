import { uni } from "@/assets/imagens";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useVendedor } from "@/context/vendedor-auth-context"; // importando o contexto

import { Mail, ArrowLeft, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast.ts";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../../utils/Api.ts";
import { useState } from "react";

function LoginVendedor() {
  const { login } = useVendedor(); // Acessando o contexto
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-7">
        <Link to="/selector" className="bg-primary p-2 rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
      </div>
      <div className="flex items-center h-52 gap-4 justify-center">
        <img src={uni} alt="logo da unifood" className="w-[100px] h-[128px] mb-10" />
      </div>

      <Formik
        initialValues={{ email: "", senha: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Email inválido").required("Email obrigatório"),
          senha: Yup.string().required("Senha obrigatória"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch(`${apiUrl}/auth/login/vendedor`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.msg || "Erro ao fazer login");
              
            }
            if (data.user && data.token) {
                login(data.user, data.token);
              } else {
                console.error('Usuário ou token não encontrados:', data);
                toast({
                  title: "Erro de login",
                  description: "Não foi possível autenticar o usuário. Verifique as credenciais.",
                  variant: "destructive",
                  duration: 800,
                });
              }
              


  
              

            toast({
              title: "Login realizado com sucesso!",
              description: "Redirecionando...",
              variant: "default",
              duration: 800,
              className: "translate-y-7",
            });

            navigate("/homevendedor");
          } catch (error) {
            toast({
              title: "Erro ao realizar login",
              description: error instanceof Error ? error.message : "Erro desconhecido",
              variant: "destructive",
              duration: 800,
              className: "translate-y-7",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 items-center">
            <div className="flex flex-col w-[300px]">
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-primary text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-2">
              <div className="relative w-[300px]">
                <Field
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  className="border-2 border-[#CE9E7E] p-2 rounded-sm w-full bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-[#CE9E7E]" /> : <Eye className="w-5 h-5 text-[#CE9E7E]" />}
                </button>
              </div>
              <ErrorMessage name="senha" component="div" className="text-primary text-sm mt-1" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-[300px]">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
          
        )}
        
      </Formik>
      <div className="flex flex-col items-center justify-center  text-center mt-6 ">
        <Link to="/recuperarsenha" className="text-foreground font-semibold mb-16">Esqueceu sua senha?</Link>
        <div className="w-64">
        <span className="text-foreground w-64">  Se você ainda não possui uma conta?</span>
        <Link to="/cadastrovendedor" className="text-foreground font-semibold"> Cadastre-se</Link>
        </div>
     
      </div>

    </div>
  );
}

export default LoginVendedor;
