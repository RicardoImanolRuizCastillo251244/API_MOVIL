const profesorRepo = require('../repositories/profesorRepository');

async function listProfesores() {
  return await profesorRepo.findAll();
}

async function getProfesor(id) {
  return await profesorRepo.findById(id);
}

module.exports = { listProfesores, getProfesor };
