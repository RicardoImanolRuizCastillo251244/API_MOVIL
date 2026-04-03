"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      usuarioId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'usuarios', key: 'id' }, onDelete: 'CASCADE' },
      materiaId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'materias', key: 'id' }, onDelete: 'CASCADE' },
      profesorId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'profesores', key: 'id' }, onDelete: 'CASCADE' },
      dia: { type: Sequelize.STRING, allowNull: false },
      horaInicio: { type: Sequelize.STRING, allowNull: false },
      horaFin: { type: Sequelize.STRING, allowNull: false },
      color: { type: Sequelize.STRING, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('horarios');
  }
};
