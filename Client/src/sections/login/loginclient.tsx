import { uni } from "@/assets/imagens";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useAuth } from "@/context/auth-context.tsx";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast.ts";
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from "../../utils/Api.ts";

function LoginClient() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  h-screen">
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
            const response = await fetch(`${apiUrl}/auth/login/cliente`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.msg || "Erro ao fazer login");
            }

            // Usando o contexto de autenticação para armazenar o usuário e o token
            login(data.user, data.token); // Chamando a função login do AuthContext

            // Exibir um toast de sucesso
            toast({
              title: "Login realizado com sucesso!",
              description: "Redirecionando...",
              variant: "default",
              duration: 800,
              className: "translate-y-7",
            });

            // Redireciona para a página inicial
            navigate("/home");
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

            {/* Form Para Email */}
            <div className="flex flex-col w-[300px]">
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]
                  text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-primary text-sm mt-1" />
            </div>

            {/* Form Para Senha */}
            <div className="flex flex-col w-[300px]">
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                <Field
                  name="senha"
                  type="password"
                  placeholder="Senha"
                  className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] placeholder-[#CE9E7E]
                  bg-transparent text-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                />
              </div>
              <ErrorMessage name="senha" component="div" className="text-primary text-sm mt-1" />
            </div>
  
            <Button type="submit" disabled={isSubmitting} className="w-[300px]">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            {/* Link para Recuperar Senha */}
            <div>
              <h3 className="text-center w-64 mt-3 mb-5">
                <Link to="/recuperarsenha" className="font-semibold ">
                  Esqueceu sua senha?
                </Link>
              </h3>
            </div>

            {/* Link para Cadastro */}
            <div>
              <h3 className="text-center w-64 mt-3">
                Se você ainda não possui uma conta?
                <Link to="/cadastrocliente" className="font-semibold ml-2">
                  Cadastre-se
                </Link>
              </h3>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginClient;
