import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context"; 
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import apiUrl from "@/utils/Api";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";

interface User {
  id: string;
  nome: string;
  telefone: string;
}

const EditarPerfil: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const { user, updateUser} = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const validationSchema = Yup.object({
    nome: Yup.string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(50, "O nome não pode ter mais de 50 caracteres")
      .required("O nome é obrigatório"), 
  });

  useEffect(() => {
    if (!token || !id) {
      console.warn("Token ou ID do usuário ainda não carregado, esperando...");
      return;
    }
  
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>(`${apiUrl}/cliente/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUserData(data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Ocorreu um erro ao buscar os dados do usuário.",
          variant: "destructive",
          className: "translate-y-7",
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [token, id]);

  const handleSubmit = async (values: { nome: string; telefone: string }) => {
    try {
      const updatedFields: any = {};

      if (values.nome !== userData?.nome) {
        updatedFields.nome = values.nome;
      }
  
       if (values.telefone && values.telefone !== userData?.telefone) {
 
        updatedFields.telefone = `+5581${values.telefone.replace(/[^0-9]/g, "")}`;
      } else if (!values.telefone) {
        updatedFields.telefone = null; 
      }
  
      if (Object.keys(updatedFields).length === 0) {
        toast({
          title: "Nenhuma alteração",
          description: "Não há alterações para salvar.",
          variant: "default",
          duration: 2000,
          className: "translate-y-7",
        });
        return;
      }
  
      await axios.put(
        `${apiUrl}/cliente/${id}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
        variant: "default",
        duration: 2000,
        className: "translate-y-7",
      });
  
  
      if (user) {
        updateUser({ ...user, ...updatedFields });
      }
  
      navigate(`/perfil/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao tentar atualizar seus dados.",
        variant: "destructive",
        duration: 2000,
        className: "translate-y-7",
      });
    }
    
  };
  
  
  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex p-6">
        <Link to={`/perfil/${id}`} className="bg-primary p-2 rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        
      </div>
      

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5">Editar Perfil</h1>
        {loading ? (
          <Loading /> 
        ) : (
        userData && (
          <Formik
            initialValues={{ nome: userData.nome, telefone: userData.telefone }} // Remove o prefixo no inicial
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col">
                <label htmlFor="nome" className="block mb-2 font-semibold">Nome</label>
                <Field id="nome" name="nome"
                  className="border-2 border-[#CE9E7E] p-2 pr-10 pl-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E]
                  text-foreground focus:border-foreground focus:outline-none focus:text-foreground mb-6"
                />
                <ErrorMessage name="nome" component="div" className="text-red-500 text-sm" />

                <label htmlFor="telefone" className="block mb-2 font-semibold">Whatsapp</label>
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
                <ErrorMessage name="telefone" component="div" className="text-red-500 text-sm" />

                <Button type="submit" disabled={isSubmitting} className="mt-6">
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
                </Form>
              )}
            </Formik>
          )
        )}
      </div>
    </div>
  );
};

export default EditarPerfil;
