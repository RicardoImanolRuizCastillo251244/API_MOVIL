const express = require('express');
const router = express.Router();
const profesorCtrl = require('../controllers/profesorController');

router.get('/', profesorCtrl.list);
router.get('/:id', profesorCtrl.getById);

module.exports = router;
