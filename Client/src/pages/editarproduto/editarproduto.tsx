import NavBarVenda from "@/components/NavBarVenda";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useVendedor } from "@/context/vendedor-auth-context";
import { NumericFormat } from "react-number-format";
import apiUrl from "@/utils/Api";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Keyboard } from "@capacitor/keyboard";

const EditarProduto = () => {
    const { vendedor, token } = useVendedor();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<any>(null);
    
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

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`${apiUrl}/produto/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
                toast({
                    title: "Erro ao carregar produto",
                    description: "Não foi possível carregar os dados do produto.",
                    variant: "destructive",
                });
            }
        };

        fetchProduto();
    }, [id, token]);

    const validationSchema = Yup.object().shape({
        quantidade: Yup.number()
            .typeError("A quantidade deve ser um número.")
            .positive("A quantidade deve ser maior que zero.")
            .integer("A quantidade deve ser um número inteiro.")
            .required("A quantidade é obrigatória."),
    });



    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("nome", values.nome);
        formData.append("preco", values.preco.toString());
        formData.append("ingredientes", values.ingredientes);
        formData.append("descricao", values.descricao);
        formData.append("quantidade", String(values.quantidade));



        if (vendedor?.id) {
            formData.append("vendedor", vendedor.id);
        } else {
            console.error("Erro: ID do vendedor não encontrado!");
            return;
        }

        try {
            await axios.put(`${apiUrl}/produto/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast({
                title: "Produto atualizado com sucesso!",
                description: "As informações do produto foram atualizadas.",
                variant: "default",
                duration: 800,
                className: "translate-y-7",
            });

            navigate("/homevendedor");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            toast({
                title: "Erro ao atualizar produto",
                description: "O produto não foi atualizado devido a um erro.",
                variant: "destructive",
                duration: 800,
                className: "translate-y-7",
            });
        }
    };

    if (!produto) {
        return (
            <div className="flex flex-col items-center h-screen overflow-x-hidden">
                <NavBarVenda />
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center h-screen overflow-x-hidden">
            <NavBarVenda />
            <div className="relative top-0 right-40 p-5">
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
            </div>
            <h1 className="text-2xl font-semibold mt-4 mb-4">Editar Produto</h1>
            <Formik
                initialValues={{
                    nome: produto?.nome || '',
                    preco: produto?.preco || 0,  // Remova o formato de moeda para facilitar a manipulação
                    ingredientes: produto?.ingredientes.join(", ") || '',
                    descricao: produto?.descricao || '',
                    quantidade: produto?.quantidade || 0,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}  // Verifique se o handleSubmit está sendo chamado aqui
                enableReinitialize
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="flex flex-col justify-center w-72 gap-4">
                            <div>
                                <label className="text-foreground font-semibold">Nome</label>
                                <Field
                                    name="nome"
                                    type="text"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                />
                                <ErrorMessage name="nome" component="p" className="text-primary" />
                            </div>

                            <div>
                                <label className="text-foreground font-semibold">Preço</label>
                                <NumericFormat
                                    name="preco"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    prefix="R$ "
                                    allowNegative={false}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    value={values.preco}  // Agora usa o valor numérico
                                    onValueChange={(values) => setFieldValue("preco", values.floatValue)} // Passa o valor numérico
                                />
                                <ErrorMessage name="preco" component="p" className="text-primary" />
                            </div>

                            <div>
                                <label className="text-foreground font-semibold">Ingredientes</label>
                                <Field
                                    as="textarea"
                                    name="ingredientes"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] h-20 bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                />
                                <ErrorMessage name="ingredientes" component="p" className="text-primary" />
                            </div>

                            <div>
                                <label className="text-foreground font-semibold">Descrição</label>
                                <Field
                                    as="textarea"
                                    name="descricao"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] h-20 bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                />
                                <ErrorMessage name="descricao" component="p" className="text-primary" />
                            </div>

                            <div>
                                <label className="text-foreground font-semibold">Quantidade</label>
                                <Field
                                    name="quantidade"
                                    type="number"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                />
                                <ErrorMessage name="quantidade" component="p" className="text-primary" />
                            </div>

                            <Button type="submit" className="mt-4 mb-6 cursor-pointer">Salvar Alterações</Button>
                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    );
};

export default EditarProduto;
