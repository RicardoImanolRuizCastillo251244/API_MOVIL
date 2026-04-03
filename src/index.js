require('dotenv').config();
const { app, sequelize } = require('./app');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();

    // Optional: allow a one-time schema sync when USE_SYNC=true
    // WARNING: use only for initial setup on a fresh DB. Do NOT enable in production permanently.
    if (process.env.USE_SYNC === 'true') {
      console.log('USE_SYNC=true — running sequelize.sync({ alter: true })');
      await sequelize.sync({ alter: true });
      console.log('Database schema synced (alter).');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
