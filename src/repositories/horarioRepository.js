const { models } = require('../models');
const { Horario } = models;

async function createHorario(data) {
  return await Horario.create(data);
}

async function findByUsuario(usuarioId) {
  return await Horario.findAll({ where: { usuarioId } });
}

async function findByIdAndUsuario(id, usuarioId) {
  return await Horario.findOne({ where: { id, usuarioId } });
}

async function updateHorario(id, usuarioId, changes) {
  const h = await findByIdAndUsuario(id, usuarioId);
  if (!h) return null;
  return await h.update(changes);
}

async function deleteHorario(id, usuarioId) {
  const h = await findByIdAndUsuario(id, usuarioId);
  if (!h) return 0;
  await h.destroy();
  return 1;
}

module.exports = { createHorario, findByUsuario, findByIdAndUsuario, updateHorario, deleteHorario };

// Find horarios that start in `minutes` minutes from now (based on day name and horaInicio "HH:mm")
async function findStartingInMinutes(minutes) {
  const target = new Date(Date.now() + minutes * 60000);
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const dayName = days[target.getDay()];
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const time = `${pad(target.getHours())}:${pad(target.getMinutes())}`;

  return await Horario.findAll({
    where: { dia: dayName, horaInicio: time },
    include: [ { model: models.Materia, attributes: ['nombre'] } ]
  });
}

// Record that a notification for this horario and scheduled time was sent
async function markNotified(horarioId, scheduledAt) {
  const { HorarioNotification } = models;
  return await HorarioNotification.create({ horarioId, scheduledAt });
}

module.exports.findStartingInMinutes = findStartingInMinutes;
module.exports.markNotified = markNotified;
