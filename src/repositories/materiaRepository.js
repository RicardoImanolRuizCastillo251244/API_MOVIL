const { models } = require('../models');
const { Materia } = models;

async function findAll() {
  return await Materia.findAll();
}

async function findById(id) {
  return await Materia.findByPk(id);
}

module.exports = { findAll, findById };
