const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const pictureController = require('../controllers/pictureController');



const checkToken = require('../middlewares/authMiddleware');

router.post('/upload', checkToken, upload.single('picture'), pictureController.create);
router.delete('/remove', checkToken, pictureController.remove);
router.update('/update', checkToken, upload.single('picture') ,pictureController.update);
router.get('/get', pictureController.get);

module.exports = router;