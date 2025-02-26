const Vendedor = require("../models/Vendedor");
const bucket = require("../config/firebaseConfig");

// Salvar imagem e associar a um vendedor
exports.create = async (req, res) => {
    try {
        const { vendedorId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ msg: "Nenhuma imagem foi enviada." });
        }

        // Verificar se o vendedor existe
        const vendedor = await Vendedor.findById(vendedorId);
        if (!vendedor) {
            return res.status(404).json({ msg: "Vendedor não encontrado." });
        }

        // Criar referência no Firebase Storage
        const fileName = `vendedores/${vendedorId}_${Date.now()}_${file.originalname}`;
        const firebaseFile = bucket.file(fileName);
        const stream = firebaseFile.createWriteStream({
            metadata: { contentType: file.mimetype }
        });

        stream.on("error", (err) => res.status(500).json({ msg: "Erro ao fazer upload.", error: err }));

        stream.on("finish", async () => {
            await firebaseFile.makePublic(); // Torna a imagem pública
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

            // Atualizar a imagem do vendedor no banco de dados
            vendedor.imagemPerfil = imageUrl;
            await vendedor.save();

            res.json({ vendedor, msg: "Imagem salva e associada ao vendedor com sucesso!", imageUrl });
        });

        stream.end(file.buffer);

    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar imagem.", error });
    }
};

// Remover imagem
exports.remove = async (req, res) => {
    try {
        const { vendedorId } = req.body;

        // Verificar se o vendedor existe
        const vendedor = await Vendedor.findById(vendedorId);
        if (!vendedor) {
            return res.status(404).json({ msg: "Vendedor não encontrado." });
        }

        // Verificar se há uma imagem associada
        if (!vendedor.imagemPerfil) {
            return res.status(400).json({ msg: "Nenhuma imagem para remover." });
        }

        // Extrair o nome do arquivo do URL
        const fileName = vendedor.imagemPerfil.split("/").pop();
        const firebaseFile = bucket.file(`vendedores/${fileName}`);

        // Remover a imagem do Firebase Storage
        await firebaseFile.delete();

        // Remover a referência no banco de dados
        vendedor.imagemPerfil = "";
        await vendedor.save();

        res.json({ msg: "Imagem removida com sucesso!" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir imagem.", error });
    }
};

exports.update = async (req, res) => {
    try {
        const { vendedorId } = req.body;
        const novaImagem = req.file;

        if (!novaImagem) {
            return res.status(400).json({ msg: "Nenhuma imagem enviada." });
        }

        // Encontra o vendedor no banco
        const vendedor = await Vendedor.findById(vendedorId);
        if (!vendedor) {
            return res.status(404).json({ msg: "Vendedor não encontrado." });
        }

        // Se já existir uma imagem, apaga do Firebase
        if (vendedor.imagemPerfil) {
            await bucket.file(vendedor.imagemPerfil).delete();
            console.log("✅ Imagem antiga apagada:", vendedor.imagemPerfil);
        }

        // Define novo caminho da imagem
        const newImageName = `users/vendedor_${Date.now()}.png`;
        const file = bucket.file(newImageName);

        // Faz o upload da nova imagem
        await file.save(novaImagem.buffer, {
            metadata: { contentType: novaImagem.mimetype },
        });

        console.log("✅ Nova imagem salva:", newImageName);

        // Atualiza a referência no banco
        vendedor.imagemPerfil = newImageName;
        await vendedor.save();

        return res.json({ msg: "Imagem atualizada com sucesso!", imagemPerfil: newImageName });
    } catch (error) {
        console.error("❌ Erro ao atualizar imagem:", error);
        return res.status(500).json({ msg: "Erro ao atualizar a imagem.", error });
    }
};

exports.get = async (req, res) => {
    try {
        const { vendedorId } = req.params;
        const vendedor = await Vendedor.findById(vendedorId);

        if (!vendedor) {
            return res.status(404).json({ msg: "Vendedor não encontrado." });
        }

        if (!vendedor.imagemPerfil) {
            return res.status(404).json({ msg: "Nenhuma imagem associada ao vendedor." });
        }

        // Retornar a URL já armazenada no banco
        return res.json({ url: vendedor.imagemPerfil });

    } catch (error) {
        console.error("❌ Erro ao buscar imagem:", error);
        return res.status(500).json({ msg: "Erro ao buscar a imagem.", error });
    }
};

