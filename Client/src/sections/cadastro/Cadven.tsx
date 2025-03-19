import { uni } from "@/assets/imagens";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { User, Mail, KeyRound, EyeOff, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast.ts";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import apiUrl from "../../utils/Api.ts";
import { Keyboard } from "@capacitor/keyboard";

// Definindo o tipo dos valores do formulário
interface VendedorFormValues {
  telefone: string;
  nome: string;
  email: string;
  chavePix: string;
  senha: string;
  confirmasenha: string;
  imagemPerfil: File | null;
}

const Cadven = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Controle da etapa
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  
  useEffect(() => {
    const setupKeyboardListeners = async () => {
        const keyboardWillShow = await Keyboard.addListener("keyboardWillShow", () => {
            document.body.classList.add("keyboard-visible");
        });

        const keyboardWillHide = await Keyboard.addListener("keyboardWillHide", () => {
            document.body.classList.remove("keyboard-visible");
        });

        // Retorna a função de limpeza
        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    };

    // Chama a função para configurar os listeners
    const cleanup = setupKeyboardListeners();

    // Espera que a Promise seja resolvida antes de chamar a função de limpeza
    cleanup.then((clean) => {
        return () => {
            clean();  // Agora, a função de limpeza será chamada corretamente após a promessa ser resolvida
        };
    });

    // Limpeza ao desmontar
    return () => {
        cleanup.then((clean) => clean());
    };
}, []);

  // Função para lidar com a mudança da imagem
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null; // Verifica se há arquivos selecionados
    if (selectedFile) {
      // Verifica o tipo de imagem
      const isValidImageType = selectedFile.type === "image/jpeg" || selectedFile.type === "image/png";

      // Verifica o tamanho do arquivo (máximo 5MB)
      const isValidSize = selectedFile.size <= 5 * 1024 * 1024; // 5MB em bytes

      if (!isValidImageType) {
        toast({
          title: "Erro no formato da imagem",
          description: "Somente arquivos JPG ou PNG são permitidos.",
          variant: "destructive",
          duration: 2000,
          className: "translate-y-7",
        });
        return; // Impede a seleção de imagem inválida
      }

      if (!isValidSize) {
        toast({
          title: "Erro no tamanho da imagem",
          description: "A imagem não pode exceder 5MB.",
          variant: "destructive",
          duration: 2000,
          className: "translate-y-7",
        });
        return; // Impede a seleção de imagem muito grande
      }

      setFile(selectedFile); // Atualiza o estado do arquivo
      setImage(selectedFile); // Atualiza a imagem para o preview
    }
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (values: VendedorFormValues) => {
    try {
      const formData = new FormData();
      formData.append("nome", values.nome);
      formData.append("email", values.email);
      formData.append("telefone", `+5581${values.telefone.replace(/[^0-9]/g, "")}`);
      formData.append("chavePix", values.chavePix);
      formData.append("senha", values.senha);
      formData.append("confirmasenha", values.confirmasenha);
      if (file) {
        formData.append("imagemPerfil", file); // Anexa o arquivo de imagem
      }

      // Envia os dados do formulário para o backend
      await axios.post(`${apiUrl}/auth/register/vendedor`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a tela de login.",
        variant: "default",
        duration: 800,
        className: "translate-y-7",
      });

      // Redireciona para o login após sucesso
      navigate("/loginvenda");
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

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">


      <Formik
        initialValues={{
          nome: "",
          email: "",
          telefone: "",
          chavePix: "",
          senha: "",
          confirmasenha: "",
          imagemPerfil: null,
        }}
        validationSchema={Yup.object({
          nome: Yup.string().required("Nome da loja é obrigatório"),
          email: Yup.string().email("Email inválido").required("Email é obrigatório"),
          telefone: Yup.string().required("Whatsapp é obrigatório").matches(/^\d{9}$/, "O telefone deve ter exatamente 9 dígitos"),
          chavePix: Yup.string().required("Chave Pix é obrigatória"),
          senha: Yup.string().min(6, "Senha muito curta").required("Senha é obrigatória"),
          confirmasenha: Yup.string()
            .oneOf([Yup.ref("senha")], "As senhas devem ser iguais")
            .required("Confirmação da senha é obrigatória"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue, isValid }) => (

          <Form className="flex flex-col items-center justify-center">

            {step === 1 ? (
              <div className="flex flex-col mt-16 mb-12">
        

                <div className="flex flex-col items-center justify-center">
                  <img src={uni} className="w-20 h-20 mb-5" alt="" />
                </div>
                {/* Nome da Loja */}
                <div>
                  <label htmlFor="nome" className="block mb-1 font-semibold">Nome</label>
                  <div className="relative">
                    <Field
                      name="nome"
                      type="text"
                      placeholder="Nome da Loja"
                      className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] hover:border-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nome}
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                  </div>
                  {touched.nome && errors.nome && <div className="text-primary">{errors.nome}</div>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] hover:border-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                  </div>
                  {touched.email && errors.email && <div className="text-primary">{errors.email}</div>}
                </div>

                {/* Telefone */}
                <div className="flex flex-col mb-2">
                  <div className="relative">
                    <label htmlFor="telefone" className="block mb-1 font-semibold">Whatsapp</label>
                    <div className="flex items-center border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent text-foreground focus-within:border-foreground focus-within:outline-none">
                      <div className="flex flex-row items-center">
                        <span className="text-primary mr-2">+55</span>
                        <span className="text-primary mr-2">81</span>{/* Tamanho fixo e margem */}
                      </div>
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
                            telefone = telefone.slice(0, 9); // Limitar para 9 dígitos
                          }
                          setFieldValue("telefone", telefone); // Atualiza o valor de telefone
                        }}
                        onBlur={handleBlur}
                        value={values.telefone}
                      />
                    </div>
                  </div>
                  {touched.telefone && errors.telefone && <div className="text-primary">{errors.telefone}</div>}
                </div>

                {/* Chave Pix */}
                <div>
                  <label htmlFor="chavePix" className="block mb-1 font-semibold">Chave Pix</label>
                  <div className="relative">
                    <KeyRound className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CE9E7E]" />
                    <Field
                      name="chavePix"
                      type="text"
                      placeholder="Chave Pix"
                      className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] hover:border-foreground focus:border-foreground focus:outline-none focus:text-foreground"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.chavePix}
                    />
                  </div>
                  {touched.chavePix && errors.chavePix && <div className="text-primary">{errors.chavePix}</div>}
                </div>

                {/* Senha e Confirmar Senha */}
                <div className="flex flex-col mb-2">
                  <div className="relative">
                    <label htmlFor="senha" className="block mb-1 font-semibold">Senha</label>
                    <div className="relative w-[300px]">
                      <Field
                        id="senha"
                        name="senha"
                        type={showPassword ? "text" : "password"}
                        className="border-2 border-[#CE9E7E] p-2 rounded-sm w-full bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.senha}
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
                  {touched.senha && errors.senha && <div className="text-primary">{errors.senha}</div>}
                </div>

                <div className="flex flex-col mb-2">
                  <div className="relative">
                    <label htmlFor="confirmasenha" className="block mb-1 font-semibold">Confirmar Senha</label>
                    <div className="relative w-[300px]">
                      <Field
                        id="confirmasenha"
                        name="confirmasenha"
                        type={showConfirmPassword ? "text" : "password"}
                        className="border-2 border-[#CE9E7E] p-2 rounded-sm w-full bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmasenha}
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
                  {touched.confirmasenha && errors.confirmasenha && <div className="text-primary">{errors.confirmasenha}</div>}
                </div>

                {/* Botão de Navegação */}
                <Button
                  type="button"
                  onClick={() => {
                    // Verifica se o formulário é válido
                    if (isValid) {
                      setStep(2); // Avança para a próxima etapa
                    } else {
                      // Caso contrário, você pode adicionar um aviso ou mensagem de erro
                      console.log("Preencha todos os campos corretamente");
                    }
                  }}
                  className={`w-[300px] bg-primary mt-7 `}
                  disabled={!isValid} // Desabilita o botão caso o formulário não seja válido
                >
                  Próximo
                </Button>
                <p className="text-center mt-7">
                  Ja possui uma conta?{" "}
                  <Link to="/loginvenda" className="text-foreground font-semibold">
                    Faça login
                  </Link>
                </p>
              </div>
            ) : (
              <div className="flex flex-col  items-center justify-center h-screen">
                {/* Etapa de Imagem */}
                <div className="flex flex-col w-[300px] gap-4 h-1/2">
                  {/* Etapa de Imagem */}
                  <label className="block  font-semibold text-center text-2xl mb-10">Adicionar<br />Foto de Perfil</label>

                  {/* Preview da imagem */}
                  <div className="flex justify-center relative">
                    {image ? (
                      <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center shadow-lg border-4 border-primary ">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          className="absolute top-0 right-0 p-2 bg-primary text-white rounded-full w-10 h-10"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="w-36 h-36 rounded-full border-2 border-dashed border-foreground flex justify-center items-center text-foreground bg-background">
                          <User size={40} />
                          <Plus className="absolute text-foreground text-3xl bottom-2  left-52" />
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Botões para voltar ou enviar */}
                <div className="flex gap-4 mt-4 w-[300px]">
                  <Button type="button" onClick={() => setStep(1)} className="w-full" variant={"outline"}>Voltar</Button>
                  <Button type="submit" className="w-full bg-primary">Cadastrar</Button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Cadven;
