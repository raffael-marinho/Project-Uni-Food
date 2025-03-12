import NavBarVenda from "@/components/NavBarVenda";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useVendedor } from "@/context/vendedor-auth-context";
import { NumericFormat } from "react-number-format";
import apiUrl from "@/utils/Api";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; 

const AdicionarProduto = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null); 
    const { vendedor, token } = useVendedor(); 
    const navigate = useNavigate();

    // Validação do Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("O nome do produto é obrigatório."),
        preco: Yup.string().required("O preço do produto é obrigatório."),
        ingredientes: Yup.string().required("Os ingredientes são obrigatórios."),
        descricao: Yup.string().required("A descrição é obrigatória."),
        quantidade: Yup.number()
            .typeError("A quantidade deve ser um número.")
            .positive("A quantidade deve ser maior que zero.")
            .integer("A quantidade deve ser um número inteiro.")
            .required("A quantidade é obrigatória."),
    });

    // Validação da imagem
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            const isValidImageType = ["image/jpeg", "image/png"].includes(selectedFile.type);
            const isValidSize = selectedFile.size <= 5 * 1024 * 1024; 

            if (!isValidImageType) {
                setImageError("Apenas imagens JPG e PNG são permitidas.");
                return;
            }

            if (!isValidSize) {
                setImageError("A imagem deve ter no máximo 5MB.");
                return;
            }

            setImageError(null); 
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("nome", values.nome);
        formData.append("preco", values.preco.replace("R$ ", "").replace(".", "").replace(",", "."));
        formData.append("ingredientes", values.ingredientes);
        formData.append("descricao", values.descricao);
        formData.append("quantidade", values.quantidade);

        if (file) {
            formData.append("file", file);
        }

        if (vendedor?.id) {
            formData.append("vendedor", vendedor.id);
        } else {
            console.error("Erro: ID do vendedor não encontrado!");
            return;
        }

        try {
            await axios.post(`${apiUrl}/produto/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast({
                title: "Produto adicionado com sucesso!",
                description: "O produto foi adicionado ao cardápio.",
                variant: "default",
                duration: 800,
                className: "translate-y-7",
            });

            navigate("/homevendedor");
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            toast({
                title: "Erro ao adicionar produto",
                description: "O produto não foi adicionado devido a um erro.",
                variant: "destructive",
                duration: 800,
                className: "translate-y-7",
            });
        }
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <NavBarVenda />
            <h1 className="text-2xl font-semibold mt-4 mb-4">Adicionar Produto</h1>
            <Formik
                initialValues={{
                    nome: "",
                    preco: "",
                    ingredientes: "",
                    descricao: "",
                    quantidade: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="flex flex-col justify-center w-72 gap-4">
                            {/* Imagem */}
                            <div>
                                <label htmlFor="imagem" className="text-foreground font-semibold">
                                    Imagem do produto
                                </label>
                                <div className="relative">
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="bg-foreground text-white p-2 rounded-sm w-[300px] cursor-pointer hover:bg-foreground transition-all flex justify-center items-center"
                                    >
                                        {file ? file.name : "Escolher arquivo"}
                                    </label>
                                    {imageError && <p className="text-primary">{imageError}</p>}
                                </div>
                            </div>

                            {/* Nome */}
                            <div>
                                <label htmlFor="nome" className="text-foreground font-semibold">Nome</label>
                                <Field name="nome" type="text" placeholder="Nome do produto"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none" />
                                <ErrorMessage name="nome" component="p" className="text-primary" />
                            </div>

                            {/* Preço */}
                            <div>
                                <label htmlFor="preco" className="text-foreground font-semibold">Preço</label>
                                <NumericFormat
                                    name="preco"
                                    placeholder="Preço do produto"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none"
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    prefix="R$ "
                                    allowNegative={false}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    onValueChange={(values) => {
                                        setFieldValue("preco", values.formattedValue);
                                    }}
                                />
                                <ErrorMessage name="preco" component="p" className="text-primary" />
                            </div>

                            {/* Ingredientes */}
                            <div>
                                <label htmlFor="ingredientes" className="text-foreground font-semibold">Ingredientes</label>
                                <Field as="textarea" name="ingredientes" placeholder="Ingredientes do produto"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] h-20 bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none resize-none" />
                                <ErrorMessage name="ingredientes" component="p" className="text-primary" />
                            </div>

                            {/* Descrição */}
                            <div>
                                <label htmlFor="descricao" className="text-foreground font-semibold">Descrição</label>
                                <Field as="textarea" name="descricao" placeholder="Descrição do produto"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] h-28 bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none resize-none" />
                                <ErrorMessage name="descricao" component="p" className="text-primary" />
                            </div>

                            {/* Quantidade */}
                            <div>
                                <label htmlFor="quantidade" className="text-foreground font-semibold">Quantidade</label>
                                <Field name="quantidade" type="number" placeholder="Quantidade do produto"
                                    className="border-2 border-[#CE9E7E] p-2 rounded-sm w-[300px] bg-transparent placeholder-[#CE9E7E] text-foreground focus:border-foreground focus:outline-none" />
                                <ErrorMessage name="quantidade" component="p" className="text-primary" />
                            </div>

                            {/* Botão de Enviar */}
                            <button type="submit" className="bg-primary text-white p-2 rounded-md mb-5">
                                Adicionar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdicionarProduto;
