const { models } = require('../models');
const { Horario } = models;
const { Op } = require('sequelize');

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
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const time = `${pad(target.getHours())}:${pad(target.getMinutes())}`;

  // window for startAt matching: exact minute (from start to end of that minute)
  const start = new Date(target);
  start.setSeconds(0, 0);
  const end = new Date(start.getTime() + 59999);

  // normalize function: lowercase and remove accents
  const normalize = (s) => {
    if (!s) return '';
    return s
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  };

  const dayNames = ['domingo','lunes','martes','miercoles','miercoles','jueves','viernes','sabado'];
  const serverDay = normalize(target.toLocaleDateString('es-ES', { weekday: 'long' }));

  // First, prefer horarios with explicit startAt timestamps in the target minute
  const withStart = await Horario.findAll({
    where: { startAt: { [Op.between]: [start, end] } },
    include: [ { model: models.Materia, attributes: ['nombre'] } ]
  });

  // Fallback: horarios without startAt — match by dia + horaInicio
  const withoutStart = await Horario.findAll({ where: { startAt: null }, include: [ { model: models.Materia, attributes: ['nombre'] } ] });
  const fallback = withoutStart.filter((h) => {
    const hDia = normalize(h.dia);
    return hDia === serverDay && h.horaInicio === time;
  });

  return withStart.concat(fallback);
}

// Record that a notification for this horario and scheduled time was sent
async function markNotified(horarioId, scheduledAt) {
  const { HorarioNotification } = models;
  return await HorarioNotification.create({ horarioId, scheduledAt });
}

module.exports.findStartingInMinutes = findStartingInMinutes;
module.exports.markNotified = markNotified;
