const express = require('express');
const router = express.Router();
const imagenCtrl = require('../controllers/imagenController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.use(verifyToken);

router.post('/', upload.single('file'), imagenCtrl.create);
router.get('/', imagenCtrl.list);
router.delete('/:id', imagenCtrl.remove);

module.exports = router;
