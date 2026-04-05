const horarioRepo = require('../repositories/horarioRepository');
const imagenRepo = require('../repositories/imagenRepository');
const { models, sequelize } = require('../models');

function createDomainError(message, statusCode, code) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  return err;
}

function toMinutes(hourText) {
  if (typeof hourText !== 'string') return null;

  const parts = hourText.split(':');
  if (parts.length !== 2) return null;

  const h = Number.parseInt(parts[0].trim(), 10);
  const m = Number.parseInt(parts[1].trim(), 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;

  return h * 60 + m;
}

function normalizeDay(day) {
  if (!day) return '';
  return day
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function hasOverlap(existingHorarios, dia, horaInicio, horaFin) {
  const newStart = toMinutes(horaInicio);
  const newEnd = toMinutes(horaFin);
  if (newStart == null || newEnd == null) return false;

  const targetDay = normalizeDay(dia);
  return existingHorarios.some((existing) => {
    if (normalizeDay(existing.dia) !== targetDay) return false;

    const existingStart = toMinutes(existing.horaInicio);
    const existingEnd = toMinutes(existing.horaFin);
    if (existingStart == null || existingEnd == null) return false;

    return newStart < existingEnd && newEnd > existingStart;
  });
}

async function createHorario(data) {
  const start = toMinutes(data.horaInicio);
  const end = toMinutes(data.horaFin);
  if (start == null || end == null) {
    throw createDomainError('Formato de hora invalido. Usa HH:mm', 400, 'INVALID_HOUR_FORMAT');
  }
  if (start >= end) {
    throw createDomainError('La hora fin debe ser mayor a la hora inicio', 400, 'INVALID_HOUR_RANGE');
  }

  // Validate materia and profesor exist (they are global seeded tables)
  const { Materia, Profesor } = models;
  const materia = await Materia.findByPk(data.materiaId);
  if (!materia) throw createDomainError('Materia not found', 400, 'MATERIA_NOT_FOUND');
  const profesor = await Profesor.findByPk(data.profesorId);
  if (!profesor) throw createDomainError('Profesor not found', 400, 'PROFESOR_NOT_FOUND');

  const horariosDia = await horarioRepo.findByUsuarioAndDia(data.usuarioId, data.dia);
  if (hasOverlap(horariosDia, data.dia, data.horaInicio, data.horaFin)) {
    throw createDomainError('Ese horario se traslapa con otra clase existente', 409, 'SCHEDULE_OVERLAP');
  }

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
