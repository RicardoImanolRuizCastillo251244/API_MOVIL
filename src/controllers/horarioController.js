const horarioService = require('../services/horarioService');

async function create(req, res) {
  try {
    const usuarioId = req.user.id;
    const payload = { ...req.body, usuarioId };
    const horario = await horarioService.createHorario(payload);
    res.status(201).json(horario);
  } catch (err) {
    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message, code: err.code });
  }
}

async function list(req, res) {
  try {
    const usuarioId = req.user.id;
    const items = await horarioService.listHorarios(usuarioId);
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    const updated = await horarioService.updateHorario(id, usuarioId, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    const ok = await horarioService.deleteHorario(id, usuarioId);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { create, list, update, remove };
