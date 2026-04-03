const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { nombre, email, password, fotoPerfil } = req.body;
    const { user, token } = await authService.register({ nombre, email, password, fotoPerfil });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login };
