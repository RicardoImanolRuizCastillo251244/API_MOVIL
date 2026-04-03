"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("device_tokens", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      token: { type: Sequelize.STRING(512), allowNull: false, unique: true },
      platform: { type: Sequelize.STRING(32), allowNull: false, defaultValue: "android" },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      lastSeenAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
    });

    await queryInterface.addIndex("device_tokens", ["usuarioId"]);
    await queryInterface.addIndex("device_tokens", ["isActive"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("device_tokens");
  }
};

