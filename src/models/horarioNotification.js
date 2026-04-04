const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('HorarioNotification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    horarioId: { type: DataTypes.INTEGER, allowNull: false },
    scheduledAt: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'horario_notifications',
    timestamps: true,
    updatedAt: false
  });
};
