const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');

// Obtener todos los productos (GET)
router.get('/', isAuthenticated, productController.getAllProducts);

// Dar de alta un nuevo producto (POST)
router.post('/', isAuthenticated, productController.createProduct);

module.exports = router;