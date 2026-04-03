const materiaService = require('../services/materiaService');

async function list(req, res) {
  try {
    const items = await materiaService.listMaterias();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const item = await materiaService.getMateria(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { list, getById };
