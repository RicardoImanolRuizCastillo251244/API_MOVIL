const imagenRepo = require('../repositories/imagenRepository');
const { models } = require('../models');

async function createImagen(data) {
  // Validate materia exists
  const { Materia, Horario } = models;
  const materia = await Materia.findByPk(data.materiaId);
  if (!materia) throw new Error('Materia not found');

  if (data.horarioId != null) {
    const horario = await Horario.findOne({ where: { id: data.horarioId, usuarioId: data.usuarioId } });
    if (!horario) throw new Error('Horario not found');
    if (Number(horario.materiaId) !== Number(data.materiaId)) {
      throw new Error('Horario does not belong to materia');
    }
  }

  // add timestamp if not provided
  if (!data.fecha) data.fecha = Date.now();

  return await imagenRepo.createImagen(data);
}

async function listImagenes(usuarioId, materiaId = null) {
  return await imagenRepo.findByUsuario(usuarioId, materiaId);
}

async function deleteImagen(id, usuarioId) {
  return await imagenRepo.deleteImagen(id, usuarioId);
}

module.exports = { createImagen, listImagenes, deleteImagen };
