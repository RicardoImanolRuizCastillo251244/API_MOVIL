const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "DeviceToken",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      usuarioId: { type: DataTypes.INTEGER, allowNull: false },
      token: { type: DataTypes.STRING(512), allowNull: false, unique: true },
      platform: { type: DataTypes.STRING(32), allowNull: false, defaultValue: "android" },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      lastSeenAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    },
    {
      tableName: "device_tokens",
      timestamps: true
    }
  );
};

