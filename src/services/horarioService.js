const horarioRepo = require('../repositories/horarioRepository');
const imagenRepo = require('../repositories/imagenRepository');
const { models, sequelize } = require('../models');

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
  return await sequelize.transaction(async (transaction) => {
    const horario = await horarioRepo.findByIdAndUsuario(id, usuarioId, { transaction });
    if (!horario) return 0;

    await imagenRepo.deleteByHorarioAndUsuario({
      horarioId: horario.id,
      materiaId: horario.materiaId,
      usuarioId,
      transaction
    });

    return await horarioRepo.deleteHorario(id, usuarioId, { transaction });
  });
}

module.exports = { createHorario, listHorarios, updateHorario, deleteHorario };
