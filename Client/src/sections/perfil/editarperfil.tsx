import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/auth-context"; 
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  nome: string;
  email: string;
}

const EditarPerfil: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validationSchema = Yup.object({
    nome: Yup.string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(50, "O nome não pode ter mais de 50 caracteres")
      .required("O nome é obrigatório"),
  });

  // Função assíncrona para buscar dados do usuário
  const fetchUserData = async (): Promise<string> => {
    try {
      const { data } = await axios.get<User>(`http://localhost:3000/cliente/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      return data.nome; 
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      toast({"title": "Erro ao carregar usuário",
            "description": "Ocorreu um erro ao carregar os dados do usuário.",
             "variant": "destructive",
             "duration": 5000});
      return "";
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleSubmit = async (values: { nome: string }) => {
    try {
      await axios.put(
        `http://localhost:3000/cliente/${id}`,
        { nome: values.nome },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast({"title": "Perfil atualizado",
            "description": "Seu perfil foi atualizado com sucesso.",
             "variant": "default",
             "duration": 5000});

      // Atualiza o contexto de autenticação
      if (user) {
        updateUser({ ...user, nome: values.nome });
      }

      navigate(`/perfil/${id}`); 
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Erro ao atualizar o perfil.");
    }
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <Formik
        initialValues={{ nome: user?.nome || "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="nome">Nome:</label>
            <Field id="nome" name="nome" />
            <ErrorMessage name="nome" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditarPerfil;
