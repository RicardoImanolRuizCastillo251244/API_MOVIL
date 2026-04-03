const express = require('express');
const router = express.Router();
const materiaCtrl = require('../controllers/materiaController');

router.get('/', materiaCtrl.list);
router.get('/:id', materiaCtrl.getById);

module.exports = router;
