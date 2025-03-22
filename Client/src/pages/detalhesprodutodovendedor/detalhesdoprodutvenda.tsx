import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { ArrowLeft } from "lucide-react";
import apiUrl from "@/utils/Api";
import { useVendedor } from "@/context/vendedor-auth-context";
import { Button } from "@/components/ui/button";
import NavBarVenda from "@/components/NavBarVenda";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface DetailLanchesProps {
  _id: string;
  nome: string;
  vendedor: {
    _id: string;
    nome: string;
  };
  preco: number;
  imagem: string;
  descricao: string;
  ingredientes: string;
  quantidade: number;
}

const ProdutoVendedor: React.FC = () => {
  const { id } = useParams();
  const { token } = useVendedor();
  const { vendedor } = useVendedor();
  const navigate = useNavigate();
  const [lanche, setLanche] = useState<DetailLanchesProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // Estado para abrir/fechar a caixa de diálogo

  // Função para excluir o produto
  const deleteProduto = async () => {
    try {
      const response = await fetch(`${apiUrl}/produto/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro ao excluir produto");

      setOpen(false); // Fecha o diálogo após a exclusão
      navigate("/homevendedor");
    } catch (error) {
      console.error("Erro ao excluir o produto", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/produto/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produto");
        return res.json();
      })
      .then((data) => {
        setLanche(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <NavBarVenda />
        <div className="flex-1 flex justify-center items-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (!lanche) {
    return (
      <div className="flex flex-col h-screen">
        <NavBarVenda />
        <div className="flex-1 flex justify-center items-center pb-40">
          <h1 className="text-xl font-semibold">Produto não encontrado!</h1>
        </div>
      </div>
    );
  }

  const isVendedor = lanche.vendedor._id === vendedor?.id;

  return (
    <div className="flex flex-col h-screen">
      <NavBarVenda />
      <div className="relative">
        <button onClick={() => navigate("/homevendedor")} className="absolute top-4 left-4 bg-primary p-2 rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <img src={lanche.imagem} className="h-44 w-full object-cover" alt={lanche.nome} />
      </div>

      <div className="flex flex-row items-center w-full pl-4 mt-2 justify-between">
        <h1 className="text-2xl font-bold w-3/4 overflow-hidden text-ellipsis whitespace-nowrap">{lanche.nome}</h1>
        <p className="text-xl font-semibold pl-1 text-primary w-1/3">R$ {lanche.preco.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-start w-full pl-4">
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.descricao}</p>
        <h1 className="text-lg font-semibold mt-8">Ingredientes</h1>
        <p className="text-sm w-3/4 overflow-hidden text-ellipsis">{lanche.ingredientes}</p>
      </div>

      <div className="flex flex-col items-start pl-4 mt-8">
        <h1 className="text-lg font-semibold">Vendedor</h1>
        <p className="text-sm">{lanche.vendedor.nome}</p>
      </div>

      <div className="flex flex-col items-start pl-4 mt-8">
        <h1 className="text-lg font-semibold">Quantidade</h1>
        <p className="text-sm">{lanche.quantidade}</p>
      </div>

      <div className="flex flex-row justify-center items-center w-full gap-8 mt-8">
        <Button onClick={() => navigate(`/editarproduto/${lanche._id}`)}>Editar Produto</Button>

        {isVendedor && (
          <>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Excluir Produto</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O produto será removido permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteProduto}>Excluir Produto</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ProdutoVendedor;
