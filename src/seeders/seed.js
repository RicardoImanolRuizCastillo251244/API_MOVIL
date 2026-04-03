require('dotenv').config();
const { sequelize, models } = require('../models');

const profesoresSeed = [
  { id: 1, nombre: 'Dr. Carlos' },
  { id: 2, nombre: 'Mtro. Alonso M' },
  { id: 3, nombre: 'Mtro. Horacio' },
  { id: 4, nombre: 'Mtra. Diana' },
  { id: 5, nombre: 'Mtro. Renan' },
  { id: 6, nombre: 'Mtro. Ali' }
];

const materiasSeed = [
  { id: 1, nombre: 'Programación Móvil', color: 'Morado', icono: '📱' },
  { id: 2, nombre: 'Bases de Datos', color: 'Azul', icono: '🗄️' },
  { id: 3, nombre: 'Estructuras de Datos', color: 'Verde', icono: '🌲' },
  { id: 4, nombre: 'Programación Web', color: 'Naranja', icono: '💻' },
  { id: 5, nombre: 'Sistemas Operativos', color: 'Rojo', icono: '🔧' },
  { id: 6, nombre: 'Ingeniería de Software', color: 'Rosa', icono: '📊' }
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    for (const p of profesoresSeed) {
      const exists = await models.Profesor.findByPk(p.id);
      if (!exists) {
        await models.Profesor.create(p);
      }
    }

    for (const m of materiasSeed) {
      const exists = await models.Materia.findByPk(m.id);
      if (!exists) {
        await models.Materia.create(m);
      }
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
}

seed();
