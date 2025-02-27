const multer = require("multer");

const storage = multer.memoryStorage(); // Mantém os arquivos na memória
const upload = multer({ storage });

module.exports = upload;
