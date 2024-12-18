const User = require("../models/Vendedor");
const fs = require("fs");

// Salvar imagem e associar a um usuário vendedor
exports.create = async (req, res) => {
    try {
        const { vendedorId } = req.body;
        const file = req.file;

        // Verificar se o usuário existe
        const vendedor = await vendedor.findById(vendedorId);
        if (!vendedor) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        // Atualizar o caminho da imagem no usuário
        vendedor.imagemPerfil = file.path;
        await vendedor.save();

        res.json({ vendedor, msg: "Imagem salva e associada ao vendedor com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar imagem." });
    }
};

// Buscar todas as imagens (não é necessário neste caso, pois as imagens estão associadas aos usuários)

// Remover imagem
exports.remove = async (req, res) => {
    try {
        const { vendedorId } = req.body;

        // Verificar se o usuário existe
        const vendedor = await vendedor.findById(vendedorId);
        if (!vendedor) {
            console.log("Vendedor não encontrado");
            return res.status(404).json({ message: "Vendedor não encontrado" });
        }

        // Remover a imagem do sistema de arquivos
        if (vendedor.imagemPerfil) {
            try {
                fs.unlinkSync(vendedor.imagemPerfil);
                console.log("Imagem removida do sistema de arquivos");
            } catch (err) {
                console.error("Erro ao remover a imagem do sistema de arquivos:", err);
                return res.status(500).json({ message: "Erro ao excluir imagem do sistema de arquivos." });
            }
        } else {
            console.log("Nenhuma imagem para remover");
        }

        // Limpar o campo picturePath do usuário
        vendedor.imagemPerfil = "";
        await vendedor.save();

        res.json({ message: "Imagem removida e campo imagemPerfil atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir imagem:", error);
        res.status(500).json({ message: "Erro ao excluir imagem." });
    }
};