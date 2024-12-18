const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },

});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não suportado.'));
        }
        cb(null, true);
    }

});

module.exports = upload;