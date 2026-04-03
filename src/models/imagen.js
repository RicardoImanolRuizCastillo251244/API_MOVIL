const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Imagen', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    materiaId: { type: DataTypes.INTEGER, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    uri: { type: DataTypes.STRING, allowNull: false },
    nota: { type: DataTypes.TEXT, allowNull: true },
    fecha: { type: DataTypes.BIGINT, allowNull: false },
    favorita: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    tableName: 'imagenes',
    timestamps: false
  });
};
