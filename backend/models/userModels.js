const pool = require('../config/db');

const UserModel = {
    // Buscar un usuario por su email para logear
    findByEmail: async (email) => {
        // 
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },

    // Crear usuario 
    create: async (userData) => {
        const { nombre, apellidos, email, clave, rol } = userData;
        // ponemos por defecto usuario
        const userRol = rol || 'usuario'; 
        
        const [result] = await pool.execute(
            'INSERT INTO usuarios (nombre, apellidos, email, clave, rol) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellidos, email, clave, userRol]
        );
        return result.insertId;
    }
};

module.exports = UserModel;