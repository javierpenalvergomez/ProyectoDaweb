const mysql = require('mysql2/promise');
require('dotenv').config(); // Cargar variables de entorno

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'compraventa_db', // Nombre corregido
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mensaje de éxito (opcional, útil para saber que conectó bien al arrancar)
pool.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la base de datos de compraventa');
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = pool;