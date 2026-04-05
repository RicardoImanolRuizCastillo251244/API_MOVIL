const { models } = require('../models');
const { Imagen } = models;
const { Op } = require('sequelize');

async function createImagen(data) {
  return await Imagen.create(data);
}

async function findByUsuario(usuarioId, materiaId = null) {
  const where = { usuarioId };
  if (materiaId) where.materiaId = materiaId;
  return await Imagen.findAll({ where });
}

async function findByIdAndUsuario(id, usuarioId) {
  return await Imagen.findOne({ where: { id, usuarioId } });
}

async function deleteImagen(id, usuarioId) {
  const img = await findByIdAndUsuario(id, usuarioId);
  if (!img) return 0;
  await img.destroy();
  return 1;
}

async function deleteByHorarioAndUsuario({ horarioId, materiaId, usuarioId, transaction }) {
  const where = {
    usuarioId,
    [Op.or]: [
      { horarioId },
      // Compatibilidad con imágenes antiguas sin horarioId asignado.
      { horarioId: null, materiaId }
    ]
  };

  const images = await Imagen.findAll({ where, transaction });
  for (const img of images) {
    await img.destroy({ transaction });
  }

  return images.length;
}

module.exports = {
  createImagen,
  findByUsuario,
  findByIdAndUsuario,
  deleteImagen,
  deleteByHorarioAndUsuario
};
