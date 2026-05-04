-- Estructura siguiendo los requisitos tecnológicos de DAWeb 25/26

CREATE DATABASE IF NOT EXISTS compraventa_db;
USE compraventa_db;

-- Tabla de Usuarios con Roles
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    rol ENUM('usuario', 'gestor') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB;

-- Tabla de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Tabla de Productos 
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    -- Estados de un producto
    estado ENUM('nuevo', 'como nuevo', 'buen estado', 'aceptable',) NOT NULL,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    n_visualizaciones INT DEFAULT 0,
    envio_disponible BOOLEAN DEFAULT FALSE,
    lugar_recogida VARCHAR(100),
    categoria_id INT,
    vendedor_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (vendedor_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabla de Compraventas 
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    comprador_id INT NOT NULL,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (comprador_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- Datos iniciales para pruebas
INSERT INTO categorias (nombre) VALUES ('Electrónica'), ('Hogar'), ('Moda'), ('Deportes');