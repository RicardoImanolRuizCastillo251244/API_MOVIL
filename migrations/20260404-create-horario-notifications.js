"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horario_notifications', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      horarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'horarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      scheduledAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.addIndex('horario_notifications', ['horarioId']);
    await queryInterface.addIndex('horario_notifications', ['scheduledAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('horario_notifications');
  }
};
