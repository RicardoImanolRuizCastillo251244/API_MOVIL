const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Materia', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    color: { type: DataTypes.STRING, allowNull: false },
    icono: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'materias',
    timestamps: false
  });
};
