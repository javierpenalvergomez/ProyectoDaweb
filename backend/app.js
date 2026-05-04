const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views')); 

// Middlewares para leer formularios y manejar sesiones
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(session({
    secret: 'secreto_super_seguro_daweb',
    resave: false,
    saveUninitialized: false
}));

// Servir archivos estáticos 
app.use(express.static(path.join(__dirname, '../public')));

// -------------Ruta de prueba--------------------
app.get('/', (req, res) => {
    res.send('Servidor inicializado correctamente según los requisitos.');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});