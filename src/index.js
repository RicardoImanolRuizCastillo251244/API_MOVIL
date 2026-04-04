require('dotenv').config();
const { app, sequelize } = require('./app');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();

    // Optional: allow a one-time schema sync when USE_SYNC=true
    // WARNING: use only for initial setup on a fresh DB. Do NOT enable in production permanently.
    if (process.env.USE_SYNC === 'true') {
      // One-time sync for initial setup. No SQL logging and no alter.
      console.log('USE_SYNC=true — running sequelize.sync()');
      await sequelize.sync();
      console.log('Database schema synced.');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    if (process.env.ENABLE_REMINDERS === 'true') {
      // start reminders job
      try {
        require('./jobs/reminderJob');
        console.log('Reminders job enabled.');
      } catch (e) {
        console.error('Failed to start reminders job:', e.message);
      }
    }
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
