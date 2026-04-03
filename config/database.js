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
}

module.exports = sequelize;
