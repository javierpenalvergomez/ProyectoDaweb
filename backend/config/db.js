const mysql = require('mysql2/promise');

// Creamos un pool de conexiones (estándar para aplicaciones web robustas)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Tu usuario de MySQL
    password: '', // Tu contraseña
    database: 'daweb_db', // El nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;