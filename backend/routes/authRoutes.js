const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const { isAuthenticated, isAdmin } = require('../middleware/auth'); // Los usaremos en otras rutas

// Rutas públicas (Handlebars)
router.get('/login', authController.renderLogin);
router.post('/login', authController.processLogin);
router.get('/logout', authController.logout);

module.exports = router;