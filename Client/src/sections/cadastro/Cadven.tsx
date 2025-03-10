import { uni } from "@/assets/imagens";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { User, Mail, MessageCircle, KeyRound, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiUrl from "../../utils/Api.ts";

// Definindo o tipo dos valores do formulário
interface VendedorFormValues {
  telefone: string;
  nome: string;
  email: string;
  chavePix: string;
  senha: string;
  confirmasenha: string;
  imagem: File | null;
}

const Cadven = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Função para enviar os dados do formulário
  const handleSubmit = async (values: VendedorFormValues) => {
    try {
        const formData = {
            nome: values.nome,
            email: values.email,
            telefone: values.telefone,  // alterado de whatsapp para telefone
            chavePix: values.chavePix,
            senha: values.senha,
            confirmasenha: values.confirmasenha,
            imagem: file ? await convertToBase64(file) : "",
          };

      // Envia os dados do formulário para o backend          

      await axios.post(
        `${apiUrl}/auth/register/vendedor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a tela de login.",
        variant: "default",
        duration: 800,
        className: "translate-y-7",
      });

      // Redireciona para o login após sucesso
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
        duration: 800,
        className: "translate-y-7",
      });
    }
  };

  // Função para converter a imagem para base64
  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex items-center h-72 gap-4">
        <img src={uni} alt="logo da unifood" className="w-[100px] h-[128px]" />
      </div>

      <Formik
        initialValues={{
          nome: "",
          email: "",
          telefone: "",
          chavePix: "",
          senha: "",
          confirmasenha: "",
          imagem: null,
        }}
        validationSchema={Yup.object({
          nome: Yup.string().required("Nome da loja é obrigatório"),
          email: Yup.string().email("Email inválido").required("Email é obrigatório"),
          telefone: Yup.string().required("Whatsapp é obrigatório"),
          chavePix: Yup.string().required("Chave Pix é obrigatória"),
          senha: Yup.string().min(6, "Senha muito curta").required("Senha é obrigatória"),
          confirmasenha: Yup.string()
            .oneOf([Yup.ref("senha")], "As senhas devem ser iguais")
            .required("Confirmação da senha é obrigatória"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-6 items-center">
          {/* Campos do Formulário */}
          <div className="flex flex-col w-[300px] gap-4">
            {/* Nome da Loja */}
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
              <Field
                name="nome"
                type="text"
                placeholder="Nome da Loja"
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
              />
              <ErrorMessage name="nome" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Whatsapp */}
           {/* Telefone */}
<div className="relative">
  <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
  <Field
    name="telefone"
    type="text"
    placeholder="Telefone"
    className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
  />
  <ErrorMessage name="telefone" component="div" className="text-red-500 text-sm" />
</div>


            {/* Chave Pix */}
            <div className="relative">
              <KeyRound className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
              <Field
                name="chavePix"
                type="text"
                placeholder="Chave Pix"
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
              />
              <ErrorMessage name="chavePix" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Senha */}
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
              <Field
                name="senha"
                type="password"
                placeholder="Senha"
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
              />
              <ErrorMessage name="senha" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Confirmação de Senha */}
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
              <Field
                name="confirmasenha"
                type="password"
                placeholder="Confirmação da Senha"
                className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]"
              />
              <ErrorMessage name="senhaConfirm" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Upload de Imagem */}
            <div className="relative">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] || null;
                  setFile(selectedFile);
                }}
              />
              <label
                htmlFor="file-upload"
                className="bg-[#FF6600] text-white p-2 rounded-sm w-[300px] cursor-pointer hover:bg-[#FF4500] transition-all flex justify-center items-center"
              >
                {file ? file.name : "Escolher arquivo"}
              </label>
            </div>
          </div>

          {/* Botão de Cadastro */}
          <Button type="submit">Cadastrar</Button>

          {/* Link para Login */}
          <div>
            <h3 className="text-center w-64 mt-3">
              Já possui uma conta? <b>Entre Agora</b>
            </h3>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Cadven;
