const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool de conexiones a MariaDB con configuración desde variables de entorno.
// Por defecto: host=127.0.0.1, puerto=3306, usuario=root, sin contraseña,
// base de datos=riego_db. Todas las opciones se pueden sobrescribir en .env.
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'riego_db',
  charset: process.env.DB_CHARSET || 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
