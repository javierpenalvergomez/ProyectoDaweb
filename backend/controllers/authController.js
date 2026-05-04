const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const authController = {
    // renderizar el formulario de login 
    renderLogin: (req, res) => {
        res.render('login', { title: 'Iniciar Sesión' });
    },

    //procesamos formulario de login 
    processLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findByEmail(email);

            if (!user) {
                return res.render('login', { error: 'Usuario no encontrado' });
            }

            // Comparar la contraseña con el hash en MySQL
            const match = await bcrypt.compare(password, user.clave);

            if (match) {
                //guardamos datos basicos y el rol
                req.session.user = {
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol 
                };
                
                // rediri bgimos basandonos en roles 
                if (user.rol === 'gestor') {
                    return res.redirect('/admin/dashboard');
                } else {
                    return res.redirect('/productos');
                }
            } else {
                return res.render('login', { error: 'Contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    //logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
            }
            res.redirect('/login');
        });
    }
};

module.exports = authController;