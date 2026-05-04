const db = require('../config/db');

const UserModel = {
    // Buscar usuario por email (usado en authController.processLogin)
    findByEmail: async (email) => {
        try {
            // Se usa el pool que configuramos para consultar la tabla usuarios
            const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
            // rows es un array con los resultados. Devolvemos el primero (o undefined si no hay)
            return rows[0]; 
        } catch (error) {
            console.error("Error al buscar usuario por email en MySQL:", error);
            throw error;
        }
    },

    // Opcional: Método para crear usuario (si decides hacer el registro)
    create: async (userData) => {
        const { nombre, apellidos, email, clave, rol } = userData;
        try {
            const [result] = await db.execute(
                'INSERT INTO usuarios (nombre, apellidos, email, clave, rol) VALUES (?, ?, ?, ?, ?)',
                [nombre, apellidos, email, clave, rol || 'usuario']
            );
            return result.insertId;
        } catch (error) {
            console.error("Error al crear usuario en MySQL:", error);
            throw error;
        }
    }
};

module.exports = UserModel;