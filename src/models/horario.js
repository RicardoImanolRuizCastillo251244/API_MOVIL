const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Horario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    materiaId: { type: DataTypes.INTEGER, allowNull: false },
    profesorId: { type: DataTypes.INTEGER, allowNull: false },
    dia: { type: DataTypes.STRING, allowNull: false },
    horaInicio: { type: DataTypes.STRING, allowNull: false },
    horaFin: { type: DataTypes.STRING, allowNull: false },
    startAt: { type: DataTypes.DATE, allowNull: true },
    color: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'horarios',
    timestamps: false
  });
};
