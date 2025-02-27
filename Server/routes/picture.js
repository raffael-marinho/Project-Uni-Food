const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const pictureController = require('../controllers/pictureController');



const checkToken = require('../middlewares/authMiddleware');

router.post('/uploadPerfil', checkToken, upload.single('picture'), pictureController.createPerfil);
router.delete('/removePerfil', checkToken, pictureController.removePerfil);
router.put('/updatePerfil', checkToken, upload.single('picture') ,pictureController.updatePerfil);
router.get('/getPerfil/:id', pictureController.getPerfil);

router.post('/uploadCapa', checkToken, upload.single('picture'), pictureController.createCapa);
router.delete('/removeCapa', checkToken, pictureController.removeCapa);
router.put('/updateCapa', checkToken, upload.single('picture') ,pictureController.updateCapa);
router.get('/getCapa/:id', pictureController.getCapa);

module.exports = router;