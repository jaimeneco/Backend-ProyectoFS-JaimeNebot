# ONPIK — Tienda de Equipamiento Deportivo

Proyecto final del Módulo de Desarrollo Web Full Stack del CEI Valencia. ONPIK es una aplicación web completa para el alquiler y venta de equipamiento deportivo de montaña y mar, desarrollada desde cero con arquitectura separada de Frontend y Backend.

---

## 🌐 Demo en producción

- **Frontend:** [frontend-proyecto-fs-jaime-nebot.vercel.app](https://frontend-proyecto-fs-jaime-nebot.vercel.app)
- **Backend API:** [backend-proyecto-fs-jaime-nebot.vercel.app](https://backend-proyecto-fs-jaime-nebot.vercel.app)

---

## 📁 Repositorios

| Parte | Repositorio |
|-------|-------------|
| Frontend | [Frontend-ProyectoFS-JaimeNebot](https://github.com/jaimeneco/Frontend-ProyectoFS-JaimeNebot) |
| Backend | [Backend-ProyectoFS-JaimeNebot](https://github.com/jaimeneco/Backend-ProyectoFS-JaimeNebot) |

---

## 🛠️ Stack tecnológico

### Frontend
- **React 18** con Vite como bundler
- **React Router DOM** para el enrutado del lado del cliente
- **CSS modular** por componente
- Variables de entorno con prefijo `VITE_` para la configuración de la API
- Desplegado en **Vercel**

### Backend
- **Node.js** con **Express**
- **MongoDB Atlas** como base de datos NoSQL en la nube
- **Mongoose** como ODM para la gestión de modelos y esquemas
- **JWT (jsonwebtoken)** para autenticación stateless
- **bcrypt** para el hasheo seguro de contraseñas
- **CORS** configurado por origen
- Desplegado en **Vercel** (serverless)

---

## 🗂️ Estructura del proyecto

### Frontend (`src/`)
```
src/
├── components/
│   ├── carrusel/          # CarruselHome, CarruselMountain, CarruselSea, CarruselVertical
│   ├── carritoCompras/    # Lógica y UI del carrito
│   ├── contenedor/        # Grid de navegación por categorías
│   ├── formulario/        # FormInicio, FormRegistro
│   ├── header/            # Header con navegación condicional por autenticación
│   ├── footer/            # Footer
│   ├── tituloAnimado/     # Títulos animados por sección
│   └── ProtectedRoute.jsx # HOC para protección de rutas privadas
├── pages/
│   ├── welcome/           # Login
│   ├── registro/          # Registro de usuario
│   ├── home/              # Página principal
│   ├── mountain/          # Catálogo de montaña
│   ├── sea/               # Catálogo de mar
│   ├── detalleProducto/   # Vista detalle + añadir al carrito
│   ├── compras/           # Carrito de compras
│   ├── usuario/           # Perfil de usuario
│   ├── aboutUs/           # Sobre nosotros
│   ├── terminos/          # Términos y condiciones
│   ├── privacidad/        # Política de privacidad
│   └── error/             # Página 404
└── App.jsx                # Definición de rutas públicas y protegidas
```

### Backend
```
├── config/
│   └── config.js          # Variables de entorno centralizadas
├── controllers/
│   ├── auth.controller.js      # Registro, login, usuario actual
│   ├── usuario.controller.js   # CRUD de usuarios
│   └── productos.controller.js # CRUD de productos
├── db/
│   └── models/
│       ├── usuario.model.js    # Esquema de usuario con roles
│       └── producto.model.js   # Esquema de producto
├── middlewares/
│   ├── auth.middleware.js      # Verificación de JWT
│   ├── role.middleware.js      # Control de acceso por rol (admin)
│   └── errors.js              # Manejadores de errores 404 y 500
├── routes/
│   ├── index.routes.js         # Enrutador principal
│   ├── auth.routes.js          # Rutas de autenticación
│   └── role.routes.js          # Rutas protegidas por rol
└── index.js                    # Entrada del servidor Express
```

---

## 🔐 Autenticación y seguridad

- Autenticación basada en **JWT** con expiración de 3 horas
- Contraseñas hasheadas con **bcrypt** (salt rounds: 10)
- Rutas del backend protegidas con middleware `authMiddleWare`
- Rutas de administración protegidas adicionalmente con `isAdmin`
- Rutas del frontend protegidas con el componente `ProtectedRoute`, que redirige al login si no hay token válido
- El Header muestra u oculta opciones de navegación según el estado de autenticación
- Variables sensibles gestionadas exclusivamente mediante `.env` (nunca en el repositorio)

---

## 📡 API REST

Base URL: `/api/v1`

### Autenticación
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/auth/registro` | Registro de nuevo usuario | No |
| POST | `/auth/login` | Inicio de sesión | No |
| GET | `/auth/me` | Obtener usuario actual | Sí |

### Usuarios
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/usuarios` | Listar todos los usuarios | Sí (admin) |
| GET | `/usuarios/:id` | Obtener usuario por ID | Sí |
| POST | `/usuarios` | Crear usuario | No |
| PUT | `/usuarios/:id` | Actualizar usuario | Sí (propio) |
| PUT | `/usuarios/:id/datos` | Actualizar nombre y email | Sí (propio) |
| PUT | `/usuarios/:id/password` | Cambiar contraseña | Sí (propio) |
| PUT | `/usuarios/:id/admin` | Asignar rol admin | Sí (admin) |

### Productos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/productos` | Listar todos los productos | No |
| GET | `/productos/:id` | Obtener producto por ID | No |
| GET | `/productos/user` | Productos del usuario autenticado | Sí |
| POST | `/productos` | Crear producto | Sí |
| PUT | `/productos/:id` | Actualizar producto | Sí |
| DELETE | `/productos/:id` | Eliminar producto | Sí |

---

## 🗄️ Modelos de datos

### Usuario
```js
{
  name: String (requerido),
  email: String (requerido, único),
  password: String (requerido, hasheado),
  image: String (opcional),
  role: String (enum: 'user' | 'admin', default: 'user'),
  productos: [ObjectId] (referencias a Producto)
}
```

### Producto
```js
{
  title: String (requerido),
  type: String (requerido, ej: 'mountain' | 'sea'),
  price: Number (requerido),
  img: String (requerido),
  description: String (opcional),
  user: ObjectId (referencia a Usuario, opcional)
}
```

---

## ⚙️ Instalación y uso local

### Requisitos
- Node.js 18+
- Cuenta en MongoDB Atlas
- Cuenta en Vercel (para despliegue)

### Backend
```bash
git clone https://github.com/jaimeneco/Backend-ProyectoFS-JaimeNebot
cd Backend-ProyectoFS-JaimeNebot
npm install
cp .env.example .env
# Rellena las variables del .env con tus credenciales
npm run dev
```

### Frontend
```bash
git clone https://github.com/jaimeneco/Frontend-ProyectoFS-JaimeNebot
cd Frontend-ProyectoFS-JaimeNebot
npm install
cp .env.example .env
# Rellena VITE_API_URL con la URL de tu backend
npm run dev
```

### Variables de entorno

**.env del Backend:**
```
PORT=3000
DOMAIN=http://localhost
DB_USER=tu_usuario_mongodb
DB_PASS=tu_contraseña_mongodb
DB_CLUSTER=tu_cluster.mongodb.net
DATABASE=nombre_base_de_datos
JWT_SECRET=tu_clave_secreta
BACKEND_URL=https://tu-backend.vercel.app
```

**.env del Frontend:**
```
VITE_API_URL=http://localhost:3000
VITE_API_ROUTER=/api/v1
VITE_AUTH_REGISTER=/auth/registro
VITE_AUTH_LOGIN=/auth/login
VITE_AUTH_GET_USER=/auth/me
VITE_API_PRODUCTOS_PUBLIC=/productos
VITE_API_PRODUCTOS=/productos
```

---

## ✨ Funcionalidades principales

- Registro e inicio de sesión con autenticación JWT
- Catálogo de productos filtrado por categoría (Mountain / Sea)
- Vista detalle de producto
- Carrito de compras gestionado con localStorage
- Perfil de usuario con cierre de sesión
- Rutas privadas protegidas en el frontend
- API REST completa con control de acceso por roles
- Despliegue continuo en Vercel desde GitHub

---

## 👨‍💻 Autor

**Jaime Nebot** — Proyecto Final Full Stack · CEI Valencia · 2025
