const { models } = require('../models');
const { Imagen } = models;

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

module.exports = { createImagen, findByUsuario, findByIdAndUsuario, deleteImagen };
