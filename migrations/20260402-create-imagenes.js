"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagenes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      materiaId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'materias', key: 'id' }, onDelete: 'CASCADE' },
      usuarioId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'usuarios', key: 'id' }, onDelete: 'CASCADE' },
      uri: { type: Sequelize.STRING, allowNull: false },
      nota: { type: Sequelize.TEXT, allowNull: true },
      fecha: { type: Sequelize.BIGINT, allowNull: false },
      favorita: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imagenes');
  }
};
