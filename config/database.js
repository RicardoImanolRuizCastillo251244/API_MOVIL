const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Prefer explicit full DB URL if provided (e.g. MYSQL_URL or DATABASE_URL)
const dbUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
let sequelize;
if (dbUrl) {
  // When a single URL is provided, let Sequelize parse it.
  sequelize = new Sequelize(dbUrl, {
    dialect: 'mysql',
    logging: false
  });
  // attach connection info (without password) for logging
  try {
    const u = new URL(dbUrl);
    sequelize.connectionInfo = {
      source: 'url',
      database: u.pathname ? u.pathname.replace(/^\//, '') : '',
      host: u.hostname,
      port: u.port || '3306',
      user: u.username || ''
    };
  } catch (e) {
    sequelize.connectionInfo = { source: 'url', raw: dbUrl };
  }
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false
    }
  );
  sequelize.connectionInfo = {
    source: 'env',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || ''
  };
}

module.exports = sequelize;
