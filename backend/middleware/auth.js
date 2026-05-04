const authMiddleware = {
    // Verifica si el usuario ha hecho login
    isAuthenticated: (req, res, next) => {
        if (req.session && req.session.user) {
            return next(); // Si hay sesión, pasa al siguiente controlador
        } else {
            // Si no hay sesión, al login
            return res.redirect('/login'); 
        }
    },

    // Verifica si el usuario es administrador
    isAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.rol === 'gestor') {
            return next();
        } else {
            // Si no es admin, acceso denegado. 
            // Podrías renderizar una vista de error hbs aquí.
            return res.status(403).send('Acceso denegado: Se requieren permisos de administrador.');
        }
    }
};

module.exports = authMiddleware;