const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepo = require('../repositories/usuarioRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

async function register({ nombre, email, password, fotoPerfil }) {
  const existing = await usuarioRepo.findByEmail(email);
  if (existing) throw new Error('Email already in use');

  const hashed = await bcrypt.hash(password, 10);
  const user = await usuarioRepo.createUsuario({ nombre, email, password: hashed, fotoPerfil });
  const token = generateToken(user);
  return { user, token };
}

async function login({ email, password }) {
  const user = await usuarioRepo.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { user, token };
}

function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = { register, login, generateToken };
