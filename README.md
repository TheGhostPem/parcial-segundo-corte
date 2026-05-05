# ⚽ Gestor FEF - Liga Profesional de Fútbol

Un sistema integral de gestión de liga de fútbol que permite la administración completa de equipos, jugadores, presidentes y competiciones. Desarrollado con una arquitectura moderna de tres capas (Frontend, Backend, Base de Datos), diseñado con un enfoque visual premium (Glassmorphism).

## 🚀 Características Principales

- **Gestión de Usuarios (Autenticación y Roles)**: Autenticación segura usando JWT y encriptación de contraseñas con bcryptjs. Soporte para múltiples roles (`admin`, `usuario`, `moderador`).
- **Dashboard Premium**: Interfaz de usuario reactiva, moderna y elegante, construida con React y Tailwind CSS, incluyendo transiciones y micro-animaciones.
- **Gestión de Equipos**: CRUD completo para manejar información de los clubes, estadios, aforo, año de fundación y ciudad de origen.
- **Gestión de Jugadores**: Administración de la plantilla de los equipos (nombre, fecha de nacimiento, posición).
- **Gestión de Competición**: Registro de partidos, asignación de equipos (local vs visitante) y seguimiento de resultados y goles con sus respectivos anotadores.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** (Inicializado con Vite)
- **Tailwind CSS** (Estilos, utilidades y diseño Glassmorphism)
- **Axios** (Peticiones HTTP al servidor REST)
- **SweetAlert2** (Alertas y notificaciones interactivas profesionales)
- **Lucide React** (Iconografía SVG)

### Backend
- **Node.js** con **Express.js** (Framework del servidor)
- **Sequelize** (ORM para la gestión de la base de datos relacional)
- **MySQL2** (Driver para la conexión a MySQL)
- **JWT (JSON Web Tokens)** (Autenticación de sesiones de usuario)
- **Bcryptjs** (Seguridad de contraseñas)

### Base de Datos
- **MySQL** (Base de datos relacional estructurada)

## 🗄️ Estructura de la Base de Datos (`parcial2_raul`)

El sistema cuenta con las siguientes entidades principales interrelacionadas:
1. `usuarios`: Gestión de credenciales, avatares y roles en la plataforma.
2. `equipos`: Información general de los clubes de fútbol (Llave Primaria: `codigo`).
3. `jugadores`: Relacionados de N a 1 con un equipo (Llave Foránea: `equipo_codigo`).
4. `presidentes`: Relación de 1 a 1 con un equipo (Llave Foránea: `equipo_codigo`).
5. `partidos`: Relacionados con equipos locales y visitantes (Relación N a 1 múltiple).
6. `goles`: Relacionados con un partido (N a 1) y jugador anotador (N a 1).

## 💻 Instalación y Configuración Local

Sigue estos pasos para desplegar el proyecto en tu entorno local:

### 1. Preparar la Base de Datos
1. Abre MySQL (puedes usar MySQL Workbench, XAMPP, etc.).
2. Ejecuta el script de la base de datos ubicado en `database/schema.sql` para crear la base de datos `parcial2_raul` y sus tablas asociadas.
3. (Opcional) Ejecuta el archivo `database/seeds.sql` o los diferentes scripts presentes en el backend (`add_colombian_teams.js`, `add_bayern.js`) utilizando `node` para poblar la base de datos con información inicial.

### 2. Configuración del Backend
1. Navega a la carpeta del servidor:
   ```bash
   cd backend
   ```
2. Instala las dependencias de Node:
   ```bash
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env` en la raíz de `backend` con las credenciales de tu base de datos local:
   ```env
   PORT=5000
   DB_NAME=parcial2_raul
   DB_USER=tu_usuario_de_mysql
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_HOST=localhost
   DB_PORT=3306
   JWT_SECRET=tu_secreto_seguro_jwt
   ```
4. Inicia el servidor de desarrollo. Automáticamente se sincronizarán los modelos:
   ```bash
   npm run dev
   # O en modo producción: npm start
   ```

### 3. Configuración del Frontend
1. Abre una nueva terminal y navega a la carpeta del cliente:
   ```bash
   cd frontend
   ```
2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
4. Abre tu navegador web en la URL indicada por la consola (normalmente `http://localhost:5173`).

## 🔑 Credenciales por Defecto

Al iniciar el servidor backend por primera vez, el sistema asegura la existencia de un usuario administrador maestro por defecto en la base de datos para pruebas iniciales:
- **Usuario:** `admin`
- **Contraseña:** `123456`

## 📁 Estructura de Directorios del Proyecto

```text
/
├── backend/                # API REST con Node.js, Express y Sequelize
│   ├── src/                # Código fuente del backend (rutas API, config BD, modelos)
│   ├── .env                # Variables de entorno (Configuraciones de base de datos)
│   ├── server.js           # Punto de entrada principal y relaciones Sequelize
│   └── package.json        # Manifiesto de dependencias del servidor
├── frontend/               # Aplicación cliente SPA en React + Vite
│   ├── src/                # Componentes (.jsx), vistas (pages), lógica y estilos globales
│   ├── public/             # Recursos estáticos
│   ├── tailwind.config.js  # Configuración global del diseño para Tailwind CSS
│   └── package.json        # Dependencias del cliente web
├── database/               # Scripts SQL iniciales
│   ├── schema.sql          # Creación estructurada de tablas y base de datos
│   └── seeds.sql           # Datos de prueba
└── README.md               # Este documento de información general
```

---
*Desarrollo universitario documentado: Parcial Raúl.*
