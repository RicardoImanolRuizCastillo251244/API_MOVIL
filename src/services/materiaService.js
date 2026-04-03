const materiaRepo = require('../repositories/materiaRepository');

async function listMaterias() {
  return await materiaRepo.findAll();
}

async function getMateria(id) {
  return await materiaRepo.findById(id);
}

module.exports = { listMaterias, getMateria };
