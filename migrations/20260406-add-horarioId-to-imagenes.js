"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('imagenes', 'horarioId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'horarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('imagenes', ['horarioId']);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('imagenes', 'horarioId');
  }
};
