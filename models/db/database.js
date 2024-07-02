import { createPool } from 'mysql2/promise.js';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../../config.js';


const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Conexión a la base de datos fue cerrada.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Base de datos tiene muchas conexiones.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Conexión a la base de datos fue rechazada.');
    }
  }

  if (connection) connection.release();

  return;
});

pool.on('acquire', function (connection) {
  console.log('Conexión %d adquirida', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Conexión %d liberada', connection.threadId);
});

export default pool;