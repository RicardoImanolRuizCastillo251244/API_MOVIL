require('dotenv').config();

// If the environment provides a full DB URL (e.g. MYSQL_URL or DATABASE_URL),
// parse it and populate DB_* variables so existing code can keep using them.
const dbUrl = process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.MYSQLDATABASEURL;
if (dbUrl) {
  try {
    const u = new URL(dbUrl);
    // Only set missing values so explicit env vars override the URL
    process.env.DB_USER = process.env.DB_USER || decodeURIComponent(u.username || '');
    process.env.DB_PASS = process.env.DB_PASS || decodeURIComponent(u.password || '');
    process.env.DB_HOST = process.env.DB_HOST || u.hostname;
    process.env.DB_PORT = process.env.DB_PORT || u.port;
    process.env.DB_NAME = process.env.DB_NAME || (u.pathname ? u.pathname.replace(/^\//, '') : '');
  } catch (err) {
    // invalid URL - warn but continue
    console.warn('Invalid DB URL provided in MYSQL_URL/DATABASE_URL:', err.message);
  }
}

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'organizador_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'organizador_db_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
};
