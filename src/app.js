const express = require('express');
const bodyParser = require('express').json;
const { models, sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(bodyParser());

app.use('/api', routes);

// simple health
app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = { app, sequelize, models };
