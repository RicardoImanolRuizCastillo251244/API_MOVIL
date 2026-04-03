const express = require('express');
const router = express.Router();
const horarioCtrl = require('../controllers/horarioController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/', horarioCtrl.create);
router.get('/', horarioCtrl.list);
router.put('/:id', horarioCtrl.update);
router.delete('/:id', horarioCtrl.remove);

module.exports = router;
