const horarioRepo = require('../repositories/horarioRepository');
const { models } = require('../models');

async function createHorario(data) {
  // Validate materia and profesor exist (they are global seeded tables)
  const { Materia, Profesor } = models;
  const materia = await Materia.findByPk(data.materiaId);
  if (!materia) throw new Error('Materia not found');
  const profesor = await Profesor.findByPk(data.profesorId);
  if (!profesor) throw new Error('Profesor not found');

  return await horarioRepo.createHorario(data);
}

async function listHorarios(usuarioId) {
  return await horarioRepo.findByUsuario(usuarioId);
}

async function updateHorario(id, usuarioId, changes) {
  return await horarioRepo.updateHorario(id, usuarioId, changes);
}

async function deleteHorario(id, usuarioId) {
  return await horarioRepo.deleteHorario(id, usuarioId);
}

module.exports = { createHorario, listHorarios, updateHorario, deleteHorario };
