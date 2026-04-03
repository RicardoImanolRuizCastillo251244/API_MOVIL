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
