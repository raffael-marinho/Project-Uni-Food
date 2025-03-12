import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVendedor } from "@/context/vendedor-auth-context";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import apiUrl from "@/utils/Api";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";

interface Vendedor {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    descricao: string;
    imagemPerfil?: string;
    status: 'Aberto' | 'Fechado';
    chavePix?: string;
    imagemCapa?: string;
}

const EditarPerfilVendedor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { vendedor, updateVendedor } = useVendedor();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [vendedorData, setVendedorData] = useState<Vendedor | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useVendedor();

    const validationSchema = Yup.object({
        nome: Yup.string()
            .min(3, "O nome deve ter pelo menos 3 caracteres")
            .max(50, "O nome não pode ter mais de 50 caracteres")
            .required("O nome é obrigatório"),
        telefone: Yup.string()
            .matches(/^\d{9}$/, "O telefone deve ter 9 dígitos")
            .required("O telefone é obrigatório"),
        descricao: Yup.string()
            .max(500, "A descrição não pode ter mais de 500 caracteres")
            .required("A descrição é obrigatória"),
    });

    useEffect(() => {
        if (!token || !id) {
            console.warn("Token ou ID do vendedor ainda não carregado, esperando...");
            return;
        }

        const fetchVendedorData = async () => {
            try {
                const { data } = await axios.get<Vendedor>(`${apiUrl}/vendedor/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setVendedorData(data);
            } catch (error) {
                console.error("Erro ao carregar vendedor:", error);
                toast({
                    title: "Erro ao carregar perfil",
                    description: "Ocorreu um erro ao buscar os dados do vendedor.",
                    variant: "destructive",
                    className: "translate-y-7",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVendedorData();
    }, [token, id]);

    const handleSubmit = async (values: Vendedor) => {
        try {
            const updatedFields: Partial<Vendedor> = {};

            if (values.nome !== vendedorData?.nome) {
                updatedFields.nome = values.nome;
            }

            if (values.telefone !== vendedorData?.telefone) {
                updatedFields.telefone = `+5581${values.telefone.replace(/[^0-9]/g, "")}`;
            }

            if (values.descricao !== vendedorData?.descricao) {
                updatedFields.descricao = values.descricao;
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
                `${apiUrl}/vendedor/${id}`,
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

            if (vendedor) {
                updateVendedor({ ...vendedor, ...updatedFields });
            }

            navigate(`/perfil-vendedor/${id}`);
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
                <Link to={`/perfil-vendedor/${id}`} className="bg-primary p-2 rounded-full shadow-md">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-5">Editar Perfil</h1>
                {loading ? (
                    <Loading />
                ) : (
                    vendedorData && (
                        <Formik
                            initialValues={{
                                id: vendedorData?.id || '', // ou qualquer valor padrão adequado
                                nome: vendedorData?.nome || '',
                                telefone: vendedorData?.telefone || '',
                                descricao: vendedorData?.descricao || '',
                                email: vendedorData?.email || '', // Adicionando 'email'
                                status: vendedorData?.status || 'Aberto', // Adicionando 'status'
                                chavePix: vendedorData?.chavePix || '', // Adicionando 'chavePix', se necessário
                                imagemPerfil: vendedorData?.imagemPerfil || '', // Adicionando 'imagemPerfil', se necessário
                                imagemCapa: vendedorData?.imagemCapa || '', // Adicionando 'imagemCapa', se necessário
                            }}
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

                                    <label htmlFor="telefone" className="block mb-2 font-semibold">Telefone</label>
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

                                    <label htmlFor="descricao" className="block mb-2 font-semibold">Descrição</label>
                                    <Field
                                        id="descricao"
                                        name="descricao"
                                        as="textarea"
                                        className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none focus:text-foreground mb-6"
                                        placeholder="Descreva seu serviço..."
                                    />
                                    <ErrorMessage name="descricao" component="div" className="text-red-500 text-sm" />

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

export default EditarPerfilVendedor;
