"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profesores', [
      { id: 1, nombre: 'Dr. Carlos' },
      { id: 2, nombre: 'Mtro. Alonso M' },
      { id: 3, nombre: 'Mtro. Horacio' },
      { id: 4, nombre: 'Mtra. Diana' },
      { id: 5, nombre: 'Mtro. Renan' },
      { id: 6, nombre: 'Mtro. Ali' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profesores', null, {});
  }
};
