const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const pictureController = require('../controllers/pictureController');



const checkToken = require('../middlewares/authMiddleware');

router.post('/upload', checkToken, upload.single('picture'), pictureController.create);
router.delete('/remove', checkToken, pictureController.remove);

module.exports = router;