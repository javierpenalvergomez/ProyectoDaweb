# 🔥 ReVentas.com

**Plataforma de compraventa de productos de segunda mano**

Proyecto Final — Desarrollo de Aplicaciones Web 2025/26  
Facultad de Informática — Universidad de Murcia

---

## 🛠 Tecnologías

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 + Vite + React Router DOM |
| **Estilos** | CSS Custom (variables, Grid, Media Queries) + Bootstrap |
| **Backend** | Node.js + Express |
| **Vistas SSR** | Handlebars (.hbs) |
| **Auth** | JWT + Cookies httpOnly |
| **Base de datos** | MySQL 8.0 (Docker) |
| **Otros** | bcrypt, CORS, cookie-parser |

---

## 🚀 Puesta en marcha

### 1. Requisitos previos

- Node.js (v18+): `nvm install --lts`
- Docker y Docker Compose

### 2. Base de datos MySQL (Docker)

```bash
cd proyecto-final
docker-compose up -d
```

Esto levanta:
- **MySQL** en puerto `6033` (user: `reventa_user`, pass: `reventa_pass`, db: `reventa`)
- **phpMyAdmin** en `http://localhost:8081`

### 3. Backend (Express API)

```bash
cd backend
npm install
npm run dev
```

Backend disponible en `http://localhost:3000`

### 4. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`

---

## 👤 Cuentas de prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@reventa.com | admin123 |
| Usuario | maria@example.com | admin123 |
| Usuario | carlos@example.com | admin123 |
| Usuario | laura@example.com | admin123 |

---

## 📁 Estructura del proyecto

```
proyecto-final/
├── compose.yml              # Docker MySQL + phpMyAdmin
├── init/init.sql            # Schema + datos iniciales
├── backend/                 # API Express (puerto 3000)
│   ├── app.js               # Servidor principal
│   ├── config/db.js         # Pool MySQL
│   ├── middleware/auth.js   # JWT middleware
│   ├── routes/              # Rutas API REST
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── products.routes.js
│   │   ├── categories.routes.js
│   │   └── sales.routes.js
│   └── views/               # Plantillas Handlebars
└── frontend/                # React + Vite (puerto 5173)
    └── src/
        ├── api/api.js       # Cliente API
        ├── context/         # AuthContext
        ├── components/      # Navbar, Footer, ProductCard...
        └── pages/           # Páginas de la app
```

---

## 📋 Funcionalidades

### Usuarios
- Registro / Login / Logout (JWT + cookies httpOnly)
- Editar perfil

### Productos
- Crear / Editar / Eliminar productos
- Catálogo con filtros (categoría, estado, precio, búsqueda)
- Paginación de listados
- Detalle con contador de visualizaciones
- Imágenes por URL

### Compraventa
- Solicitar compra de un producto
- Historial de compras y ventas

### Administración
- Panel admin: ver todos los usuarios
- Panel admin: ver todas las compraventas

### Diseño
- Responsive (RWD con Media Queries)
- CSS Grid en catálogo
- Dark mode con paleta cálida
- Animaciones y microinteracciones
