"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materias', [
      { id: 1, nombre: 'Programación Móvil', color: 'Morado', icono: '📱' },
      { id: 2, nombre: 'Bases de Datos', color: 'Azul', icono: '🗄️' },
      { id: 3, nombre: 'Estructuras de Datos', color: 'Verde', icono: '🌲' },
      { id: 4, nombre: 'Programación Web', color: 'Naranja', icono: '💻' },
      { id: 5, nombre: 'Sistemas Operativos', color: 'Rojo', icono: '🔧' },
      { id: 6, nombre: 'Ingeniería de Software', color: 'Rosa', icono: '📊' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materias', null, {});
  }
};
