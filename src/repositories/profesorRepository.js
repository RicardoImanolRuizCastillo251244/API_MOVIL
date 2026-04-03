const { models } = require('../models');
const { Profesor } = models;

async function findAll() {
  return await Profesor.findAll();
}

async function findById(id) {
  return await Profesor.findByPk(id);
}

module.exports = { findAll, findById };
