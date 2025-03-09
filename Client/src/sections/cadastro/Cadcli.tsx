import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import apiUrl from "@/utils/Api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Loading from "@/components/Loading";
import { uni } from "@/assets/imagens";

const CadastroCliente: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        nome: Yup.string()
            .min(3, "O nome deve ter pelo menos 3 caracteres")
            .max(50, "O nome não pode ter mais de 50 caracteres")
            .required("O nome é obrigatório"),
        telefone: Yup.string()
            .matches(/^\d{9}$/, "O telefone deve ter exatamente 9 dígitos")
            .required("O telefone é obrigatório"),
        email: Yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
        senha: Yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .required("A senha é obrigatória"),
        confirmasenha: Yup.string()
            .oneOf([Yup.ref("senha"), ""], "As senhas devem ser iguais")
            .required("A confirmação de senha é obrigatória"),
    });

    const handleSubmit = async (values: { nome: string; telefone: string; email: string; senha: string, confirmasenha: string }) => {
        setLoading(true);
        try {
            const newClient = {
                nome: values.nome,
                telefone: `+5581${values.telefone.replace(/[^0-9]/g, "")}`,
                email: values.email,
                senha: values.senha,
                confirmasenha: values.confirmasenha, 
            };
        
            await axios.post(`${apiUrl}/auth/register/cliente`, newClient, {
                headers: {
                    "Content-Type": "application/json", 
                },
                
            });
            toast ({
                title: "Cadastro realizado com sucesso!",
                description: "O cliente foi cadastrado com sucesso.",
                variant: "default",
                duration: 2000,
                className: "translate-y-7",
            });
            navigate("/logincliente");
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            toast({
                title: "Erro ao cadastrar cliente",
                description: "Ocorreu um erro ao tentar cadastrar o cliente.",
                variant: "destructive",
                duration: 2000,
                className: "translate-y-7",
            });
        } finally {
            setLoading(false);
        }
    };
        
    return (
        <div className="flex flex-col h-screen">
            <div className="flex p-7">
                <Link to="/logincliente" className="bg-primary p-2 rounded-full shadow-md">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
                <img src={uni} className="w-20 h-20 mb-5" alt="" />
                {loading ? (
                    <Loading />
                ) : (
                    <Formik
                        initialValues={{ nome: "", telefone: "", email: "", senha: "", confirmasenha: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="flex flex-col">
                                {/* Nome */}
                                <div className="flex flex-col mb-2">
                                <div className="relative">
                                <label htmlFor="nome" className="block mb-1 font-semibold">Nome</label>
                                <Field
                                    id="nome"
                                    name="nome"
                                    type="nome"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none  "
                                    placeholder="Digite seu nome"
                                />
                                </div>
                                <ErrorMessage name="nome" component="div" className="text-primary text-sm" />

                                </div>
                              
                                {/* Telefone */}
                                <div className="flex flex-col mb-2">
                                <div className="relative">
                                <label htmlFor="telefone" className="block mb-1 font-semibold">Whatsapp</label>
                                <div className="flex items-center border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent text-foreground focus-within:border-foreground focus-within:outline-none">
                                    <span className="text-primary">+55 81</span>
                                    <Field
                                        id="telefone"
                                        name="telefone"
                                        type="tel"
                                        placeholder="999999999"
                                        maxLength={9}
                                        className="ml-2 flex-1 bg-transparent outline-none placeholder-[#CE9E7E] text-foreground"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            let telefone = e.target.value.replace(/[^0-9]/g, "");
                                            if (telefone.length > 9) {
                                                telefone = telefone.slice(0, 9);
                                            }
                                            setFieldValue("telefone", telefone);
                                        }}
                                    />
                                </div>
                                </div>
                                <ErrorMessage name="telefone" component="div" className="text-primary text-sm" />
                                </div>
                                
                                

                                {/* Email */}
                                <div className="flex flex-col mb-2">
                                <div className="relative">
                                <label htmlFor="email" className="block mb-1 font-semibold">E-mail</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-primary text-sm" />
                                </div>
                                
                                <div className="flex flex-col mb-2">
                                <div className="relative">
                                <label htmlFor="senha" className="block mb-1 font-semibold">Senha</label>
                                <div className="relative w-[300px]">
                                    <Field
                                        id="senha"
                                        name="senha"
                                        type={showPassword ? "text" : "password"}
                                        className="border-2 border-[#CE9E7E] p-2 rounded-sm w-full bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-2 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5 text-[#CE9E7E]" /> : <Eye className="w-5 h-5 text-[#CE9E7E]" />}
                                    </button>
                                </div>
                                </div>
                                <ErrorMessage name="senha" component="div" className="text-primary text-sm" />
                                </div>
                                
                                

                                {/* Confirmar Senha */}
                                <div className="flex flex-col mb-2">
                                <div className="relative">
                                <label htmlFor="confirmasenha" className="block mb-1 font-semibold">Confirmar Senha</label>
                                <div className="relative w-[300px]">
                                    <Field
                                        id="confirmasenha"
                                        name="confirmasenha"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="border-2 border-[#CE9E7E] p-2 rounded-sm w-full bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none mb-2"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-2 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5 text-[#CE9E7E]" /> : <Eye className="w-5 h-5 text-[#CE9E7E]" />}
                                    </button>
                                </div>
                                </div>
                                <ErrorMessage name="confirmasenha" component="div" className="text-primary text-sm" />
                                </div>
                            
                                {/* Botão de Cadastro */}
                                <Button type="submit" disabled={isSubmitting} className="mt-4">
                                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                )}
                <div className="flex flex-col items-center w-48 text-center">
                    <p className="text-foreground mt-5 mb-20 ">
                        Ja possui uma conta?{" "}
                        <Link to="/logincliente" className="text-foreground font-semibold hover:text-foreground">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CadastroCliente;
