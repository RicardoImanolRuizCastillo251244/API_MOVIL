const { models } = require('../models');
const { Usuario } = models;

async function createUsuario(data) {
  const usuario = await Usuario.create(data);
  return usuario;
}

async function findByEmail(email) {
  return await Usuario.findOne({ where: { email } });
}

async function findById(id) {
  return await Usuario.findByPk(id);
}

module.exports = { createUsuario, findByEmail, findById };
