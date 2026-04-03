const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Profesor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    tableName: 'profesores',
    timestamps: false
  });
};
