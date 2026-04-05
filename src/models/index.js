const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const UsuarioModel = require('./usuario');
const MateriaModel = require('./materia');
const ProfesorModel = require('./profesor');
const HorarioModel = require('./horario');
const ImagenModel = require('./imagen');
const DeviceTokenModel = require('./deviceToken');

const Usuario = UsuarioModel(sequelize);
const Materia = MateriaModel(sequelize);
const Profesor = ProfesorModel(sequelize);
const Horario = HorarioModel(sequelize);
const Imagen = ImagenModel(sequelize);
const DeviceToken = DeviceTokenModel(sequelize);
const HorarioNotificationModel = require('./horarioNotification');
const HorarioNotification = HorarioNotificationModel(sequelize);

// Associations
Usuario.hasMany(Horario, { foreignKey: 'usuarioId' });
Horario.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Materia.hasMany(Horario, { foreignKey: 'materiaId' });
Horario.belongsTo(Materia, { foreignKey: 'materiaId' });

Profesor.hasMany(Horario, { foreignKey: 'profesorId' });
Horario.belongsTo(Profesor, { foreignKey: 'profesorId' });

Materia.hasMany(Imagen, { foreignKey: 'materiaId' });
Imagen.belongsTo(Materia, { foreignKey: 'materiaId' });

// new association: Imagen may belong to a Horario
Horario.hasMany(Imagen, { foreignKey: 'horarioId' });
Imagen.belongsTo(Horario, { foreignKey: 'horarioId' });

Usuario.hasMany(Imagen, { foreignKey: 'usuarioId' });
Imagen.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(DeviceToken, { foreignKey: 'usuarioId' });
DeviceToken.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Horario.hasMany(HorarioNotification, { foreignKey: 'horarioId' });
HorarioNotification.belongsTo(Horario, { foreignKey: 'horarioId' });

module.exports = {
  sequelize,
  Sequelize,
  models: {
    Usuario,
    Materia,
    Profesor,
    Horario,
    Imagen,
    DeviceToken
    ,HorarioNotification
  }
};
