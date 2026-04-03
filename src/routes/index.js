const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const horariosRoutes = require('./horarios');
const imagenesRoutes = require('./imagenes');
const materiasRoutes = require('./materias');
const profesoresRoutes = require('./profesores');
const pushRoutes = require('./push');
const devicesRoutes = require('./devices');

router.get('/', (req, res) => res.json({ message: 'Organizador Academico API' }));

router.use('/auth', authRoutes);
router.use('/horarios', horariosRoutes);
router.use('/imagenes', imagenesRoutes);
router.use('/materias', materiasRoutes);
router.use('/profesores', profesoresRoutes);
router.use('/push', pushRoutes);
router.use('/devices', devicesRoutes);

module.exports = router;
