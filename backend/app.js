const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Importación de Middlewares y Rutas
const { isAuthenticated, isAdmin } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000; 

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// Configuración del motor de plantillas Handlebars (Requisito DAWeb)
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); 

// Middlewares globales (Formularios, JSON, Sesiones)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_super_seguro_daweb',
    resave: false,
    saveUninitialized: false
}));

// 1. Archivos estáticos públicos (CSS, imágenes para vistas Handlebars)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Archivos estáticos compilados de REACT
app.use(express.static(path.join(__dirname, '../frontend/build'))); 

// 3. Montar rutas de Autenticación
app.use('/', authRoutes);

// 4. Montar rutas de la API de Productos
app.use('/api/productos', productRoutes);

// 5. Panel de Administración (Protegido por isAdmin, usa Handlebars)
app.get('/admin/dashboard', isAdmin, (req, res) => {
    // Aquí consultarás a MySQL los usuarios y ventas más adelante
    res.render('adminDashboard', { 
        title: 'Panel de Gestión', 
        admin: req.session.user 
    });
});

// 6. Conexión con REACT (Protegida por isAuthenticated)
app.get('/productos', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 7. Catch-all para subrutas de React (Mantiene a React en control de la UI)
app.get('/productos/*', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Inicialización del servidor (Siempre al final)
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});