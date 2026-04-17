require('dotenv').config();
const { sequelize, models } = require('../models');

const profesoresSeed = [
  { id: 1, nombre: 'Dr. Carlos' },
  { id: 2, nombre: 'Mtro. Alonso M' },
  { id: 3, nombre: 'Mtro. Horacio' },
  { id: 4, nombre: 'Mtra. Diana' },
  { id: 5, nombre: 'Mtro. Renan' },
  { id: 6, nombre: 'Mtro. Alonso G' },
  { id: 7, nombre: 'Mtro. Viviana'},
  { id: 8, nombre: 'Mtro. Ramses'},
  { id: 9, nombre: 'Mtro. Alejandro'},
  { id: 10, nombre: 'Mtro. Viviana B'},
  { id: 11, nombre: 'Mtro. Miguel E'},
  { id: 12, nombre: 'Mtro. Sirgei'},
  { id: 13, nombre: 'Mtro. Marcelo'}
];

const materiasSeed = [
  // 1er Cuatrimestre
  { id: 1, nombre: 'Inglés I', color: 'Gris', icono: '🗣️' },
  { id: 2, nombre: 'Desarrollo Humano y Valores', color: 'Rosa', icono: '🧠' },
  { id: 3, nombre: 'Fundamentos Matemáticos', color: 'Azul', icono: '➕' },
  { id: 4, nombre: 'Fundamentos de Redes', color: 'Naranja', icono: '🌐' },
  { id: 5, nombre: 'Física', color: 'Cian', icono: '🧪' },
  { id: 6, nombre: 'Fundamentos de Programación', color: 'Verde', icono: '⌨️' },
  { id: 7, nombre: 'Comunicación y Habilidades Digitales', color: 'Amarillo', icono: '📝' },

  // 2do Cuatrimestre
  { id: 8, nombre: 'Inglés II', color: 'Gris', icono: '🗣️' },
  { id: 9, nombre: 'Habilidades Socioemocionales y Manejo de Conflictos', color: 'Rosa', icono: '🤝' },
  { id: 10, nombre: 'Cálculo Diferencial', color: 'Azul', icono: '📐' },
  { id: 11, nombre: 'Conmutación y Enrutamiento de Redes', color: 'Naranja', icono: '🔌' },
  { id: 12, nombre: 'Probabilidad y Estadística', color: 'Azul', icono: '📊' },
  { id: 13, nombre: 'Programación Estructurada', color: 'Verde', icono: '🏗️' },
  { id: 14, nombre: 'Sistemas Operativos', color: 'Rojo', icono: '🖥️' },

  // 3er Cuatrimestre
  { id: 15, nombre: 'Inglés III', color: 'Gris', icono: '🗣️' },
  { id: 16, nombre: 'Desarrollo del Pensamiento y Toma de Decisiones', color: 'Rosa', icono: '💡' },
  { id: 17, nombre: 'Cálculo Integral', color: 'Azul', icono: '♾️' },
  { id: 18, nombre: 'Tópicos de Calidad para el Diseño de Software', color: 'Morado', icono: '💎' },
  { id: 19, nombre: 'Bases de Datos', color: 'Azul Marino', icono: '🗄️' },
  { id: 20, nombre: 'Programación Orientada a Objetos', color: 'Verde', icono: '📦' },
  { id: 21, nombre: 'Proyecto Integrador I', color: 'Dorado', icono: '🚀' },

  // 4to Cuatrimestre
  { id: 22, nombre: 'Inglés IV', color: 'Gris', icono: '🗣️' },
  { id: 23, nombre: 'Ética Profesional', color: 'Blanco', icono: '⚖️' },
  { id: 24, nombre: 'Cálculo de Varias Variables', color: 'Azul', icono: '📈' },
  { id: 25, nombre: 'Aplicaciones Web', color: 'Naranja', icono: '🌐' },
  { id: 26, nombre: 'Estructura de Datos', color: 'Verde', icono: '🌲' },
  { id: 27, nombre: 'Desarrollo de Aplicaciones Móviles', color: 'Morado', icono: '📱' },
  { id: 28, nombre: 'Análisis y Diseño de Software', color: 'Rosa', icono: '🖍️' },

  // 5to Cuatrimestre
  { id: 29, nombre: 'Inglés V', color: 'Gris', icono: '🗣️' },
  { id: 30, nombre: 'Liderazgo de Equipos de Alto Desempeño', color: 'Rosa', icono: '🏆' },
  { id: 31, nombre: 'Ecuaciones Diferenciales', color: 'Azul', icono: '🖍️' },
  { id: 32, nombre: 'Aplicaciones Web Orientadas a Servicios', color: 'Naranja', icono: '☁️' },
  { id: 33, nombre: 'Bases de Datos Avanzadas', color: 'Azul Marino', icono: '🗃️' },
  { id: 34, nombre: 'Estándares y Métricas para el Desarrollo de Software', color: 'Morado', icono: '📏' },
  { id: 35, nombre: 'Proyecto Integrador II', color: 'Dorado', icono: '⚙️' },

  // 7mo Cuatrimestre (Ingeniería)
  { id: 36, nombre: 'Inglés VI', color: 'Gris', icono: '🗣️' },
  { id: 37, nombre: 'Habilidades Gerenciales', color: 'Rosa', icono: '👔' },
  { id: 38, nombre: 'Fundamentos de Inteligencia Artificial', color: 'Cian', icono: '🤖' },
  { id: 39, nombre: 'Ética y Legislación en TI', color: 'Blanco', icono: '📜' },
  { id: 40, nombre: 'Programación para Inteligencia Artificial', color: 'Verde', icono: '🧠' },
  { id: 41, nombre: 'Administración de Servidores', color: 'Rojo', icono: '🗄️' },
  { id: 42, nombre: 'Formulación de Proyectos de Tecnología', color: 'Dorado', icono: '📝' },

  // 8vo Cuatrimestre
  { id: 43, nombre: 'Inglés VII', color: 'Gris', icono: '🗣️' },
  { id: 44, nombre: 'Electrónica Digital', color: 'Cian', icono: '📟' },
  { id: 45, nombre: 'Optativa I', color: 'Verde Lima', icono: '⚙️' },
  { id: 46, nombre: 'Seguridad Informática', color: 'Rojo', icono: '🛡️' },
  { id: 47, nombre: 'Evaluación de Proyectos de Tecnología', color: 'Dorado', icono: '📊' },

  // 9no Cuatrimestre
  { id: 48, nombre: 'Inglés VIII', color: 'Gris', icono: '🗣️' },
  { id: 49, nombre: 'Gestión de Proyectos de Tecnología', color: 'Dorado', icono: '📂' },
  { id: 50, nombre: 'Optativa II', color: 'Verde Lima', icono: '⚙️' },
  { id: 51, nombre: 'Internet de las Cosas', color: 'Cian', icono: '📡' },
  { id: 52, nombre: 'Ciencia de Datos', color: 'Azul', icono: '📉' },
  { id: 53, nombre: 'Informática Forense', color: 'Rojo', icono: '🔍' },
  { id: 54, nombre: 'Proyecto Integrador III', color: 'Dorado', icono: '🛠️' }
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const force = process.argv.includes('--force') || process.env.FORCE_SEED === 'true';

    if (force) {
      console.log('Force seeding enabled — deleting dependent data first');
      // Delete dependent data in correct order to avoid FK constraint errors
      if (models.HorarioNotification) await models.HorarioNotification.destroy({ where: {} });
      if (models.Imagen) await models.Imagen.destroy({ where: {} });
      if (models.Horario) await models.Horario.destroy({ where: {} });
      // Then clear profesores y materias
      if (models.Profesor) await models.Profesor.destroy({ where: {} });
      if (models.Materia) await models.Materia.destroy({ where: {} });
    }

    for (const p of profesoresSeed) {
      await models.Profesor.upsert(p);
    }

    for (const m of materiasSeed) {
      await models.Materia.upsert(m);
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
}

seed();
