require('dotenv').config();
const { app, sequelize } = require('./app');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    console.log('DB connection info:', sequelize.connectionInfo || 'unknown');
    console.log('Attempting to authenticate with the database...');
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');

    // Optional: allow a one-time schema sync when USE_SYNC=true
    // WARNING: use only for initial setup on a fresh DB. Do NOT enable in production permanently.
    if (process.env.USE_SYNC === 'true') {
      console.log('USE_SYNC=true — running sequelize.sync({ alter: true })');
      try {
        await sequelize.sync({
          alter: true,
          logging: (sql) => console.log('sequelize SQL:', sql)
        });
        console.log('Database schema synced (alter).');
      } catch (syncErr) {
        console.error('sequelize.sync failed:', syncErr);
      }

      // List tables to verify creation (MySQL)
      try {
        const [results /*, metadata */] = await sequelize.query('SHOW TABLES');
        console.log('SHOW TABLES result:', results.length ? results.slice(0, 20) : results);
      } catch (qErr) {
        console.error('SHOW TABLES failed:', qErr);
      }
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
