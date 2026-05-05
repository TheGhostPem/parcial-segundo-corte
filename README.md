# ⚽ Gestor FEF — Liga Profesional de Fútbol

> Sistema integral de gestión de liga de fútbol con arquitectura moderna de **3 capas**: Frontend SPA en React, API REST en Node.js/Express y base de datos relacional MySQL.

![Stack](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?style=flat-square&logo=react)
![Stack](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=flat-square&logo=node.js)
![Stack](https://img.shields.io/badge/Base%20de%20Datos-MySQL-4479A1?style=flat-square&logo=mysql)
![Stack](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)

---

## 📋 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características](#-características)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
5. [Base de Datos](#-base-de-datos)
6. [API REST — Endpoints](#-api-rest--endpoints)
7. [Sistema de Roles y Autenticación JWT](#-sistema-de-roles-y-autenticación-jwt)
8. [Instalación y Configuración](#-instalación-y-configuración)
9. [Variables de Entorno](#-variables-de-entorno)
10. [Credenciales por Defecto](#-credenciales-por-defecto)
11. [Estructura de Directorios](#-estructura-de-directorios)

---

## 📖 Descripción General

**Gestor FEF** es una aplicación web fullstack para la administración completa de una liga de fútbol profesional. Permite a administradores gestionar equipos, jugadores, presidentes, partidos y goles desde un dashboard visual moderno con diseño **Glassmorphism** y estética premium.

La aplicación cuenta con un sistema de autenticación seguro basado en **JWT** y control de acceso por roles, diferenciando las operaciones que puede realizar un administrador versus un usuario estándar.

---

## 🚀 Características

| Módulo | Descripción |
|---|---|
| 🔐 **Autenticación** | Login/Registro seguro con JWT y hashing bcrypt |
| 👥 **Gestión de Usuarios** | Roles diferenciados: `admin`, `moderador`, `usuario` |
| 🏟️ **Gestión de Equipos** | CRUD completo: crear, editar y eliminar clubes |
| 👟 **Gestión de Jugadores** | Administración de plantillas con posición y fecha de nacimiento |
| 👔 **Gestión de Presidentes** | Registro de directivos vinculados a cada equipo |
| ⚽ **Competición** | Registro de partidos, resultados y goles por anotador |
| 📊 **Dashboard Estadístico** | Vista de tabla de posiciones y estadísticas generales |
| 💎 **UI Premium** | Glassmorphism, micro-animaciones, diseño responsive |
| 🔔 **Alertas Interactivas** | Notificaciones con SweetAlert2 para todas las operaciones |

---

## 🛠️ Stack Tecnológico

### Frontend (`/frontend`)
| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 19.x | Librería UI principal (SPA) |
| **Vite** | 8.x | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 3.x | Estilos utilitarios y diseño visual |
| **Axios** | 1.x | Peticiones HTTP a la API REST |
| **React Router DOM** | 7.x | Navegación entre vistas |
| **SweetAlert2** | 11.x | Modales y alertas interactivas |
| **Lucide React** | 1.x | Iconografía SVG |

### Backend (`/backend`)
| Tecnología | Versión | Uso |
|---|---|---|
| **Node.js** | LTS | Entorno de ejecución del servidor |
| **Express.js** | 5.x | Framework HTTP para la API REST |
| **Sequelize** | 6.x | ORM para mapeo objeto-relacional |
| **MySQL2** | 3.x | Driver de conexión a MySQL |
| **JSON Web Tokens (JWT)** | 9.x | Autenticación de sesiones stateless |
| **Bcryptjs** | 3.x | Encriptación segura de contraseñas |
| **Dotenv** | 17.x | Gestión de variables de entorno |
| **Nodemon** | 3.x | Recarga automática en desarrollo |

### Base de Datos
- **MySQL** — Base de datos relacional (`parcial2_raul`)

---

## 🏗️ Arquitectura del Proyecto

```
Cliente (React SPA)
        │
        │  HTTP/REST (Axios)
        ▼
API REST (Express + JWT Middleware)
        │
        │  Sequelize ORM
        ▼
Base de Datos (MySQL — parcial2_raul)
```

El frontend corre en el puerto **5173** (Vite) y consume la API que corre en el puerto **5000** (Express). Toda comunicación entre capas se realiza mediante JSON. Las rutas protegidas requieren el envío del token JWT en el header `Authorization: Bearer <token>`.

---

## 🗄️ Base de Datos

**Nombre de la BD:** `parcial2_raul`

### Entidades y Relaciones

```
equipos (1) ──────────── (N) jugadores
equipos (1) ──────────── (1) presidentes
equipos (1) ──────────── (N) partidos [como local]
equipos (1) ──────────── (N) partidos [como visitante]
partidos (1) ──────────── (N) goles
jugadores (1) ──────────── (N) goles [como anotador]
usuarios [entidad independiente de gestión de acceso]
```

### Descripción de Tablas

#### `equipos`
| Campo | Tipo | Descripción |
|---|---|---|
| `codigo` | VARCHAR(255) PK | Código único del equipo (ej: `RM`, `FCB`) |
| `nombre` | VARCHAR(255) | Nombre oficial del club |
| `estadio` | VARCHAR(255) | Nombre del estadio |
| `aforo` | INT | Capacidad del estadio |
| `año_fundacion` | INT | Año de fundación del club |
| `ciudad` | VARCHAR(255) | Ciudad sede |

#### `jugadores`
| Campo | Tipo | Descripción |
|---|---|---|
| `codigo` | VARCHAR(255) PK | Código único del jugador |
| `nombre` | VARCHAR(255) | Nombre completo |
| `fecha_nacimiento` | DATE | Fecha de nacimiento |
| `posicion` | VARCHAR(255) | Posición en el campo |
| `equipo_codigo` | VARCHAR(255) FK | Referencia al equipo |

#### `presidentes`
| Campo | Tipo | Descripción |
|---|---|---|
| `dni` | VARCHAR(255) PK | DNI del presidente |
| `nombre` | VARCHAR(255) | Nombre |
| `apellidos` | VARCHAR(255) | Apellidos |
| `fecha_nacimiento` | DATE | Fecha de nacimiento |
| `año_inicio` | INT | Año en que asumió el cargo |
| `equipo_codigo` | VARCHAR(255) FK | Equipo que preside |

#### `usuarios`
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT AUTO_INCREMENT PK | ID único |
| `usuario` | VARCHAR(255) UNIQUE | Nombre de usuario |
| `password` | VARCHAR(255) | Contraseña (hash bcrypt) |
| `imagen` | VARCHAR(255) | URL/path del avatar |
| `rol` | ENUM | `admin`, `usuario`, `moderador` |
| `creado_en` | TIMESTAMP | Fecha de creación |
| `actualizado_en` | TIMESTAMP | Última modificación |

> El diagrama entidad-relación completo se encuentra en [`docs/entidad__relation.jpg`](./docs/entidad__relation.jpg).

---

## 🔌 API REST — Endpoints

**Base URL:** `http://localhost:5000/api`

### Autenticación (Público)
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/register` | Registrar nuevo usuario |
| `POST` | `/login` | Iniciar sesión y obtener JWT |

### Liga — Lectura (🔒 Requiere Token)
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/info` | Información completa de la liga (equipos, jugadores, presidentes) |
| `GET` | `/stats` | Estadísticas y tabla de posiciones |
| `GET` | `/jugadores` | Listado de todos los jugadores |
| `GET` | `/partidos` | Listado de todos los partidos |

### Equipos — CRUD (🔒🛡️ Solo `admin`)
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/equipos` | Crear nuevo equipo |
| `PUT` | `/equipos/:codigo` | Editar equipo existente |
| `DELETE` | `/equipos/:codigo` | Eliminar equipo |

### Otras Entidades (🔒🛡️ Solo `admin`)
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/presidentes` | Registrar presidente |
| `POST` | `/jugadores` | Registrar jugador |
| `POST` | `/partidos` | Crear nuevo partido |
| `POST` | `/goles` | Registrar gol en un partido |

### Utilitario
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/seed` | Poblar BD con datos de prueba |

---

## 🔐 Sistema de Roles y Autenticación JWT

### Flujo de Autenticación

```
1. Usuario ingresa credenciales en el Login
2. POST /api/login → Backend verifica con bcrypt
3. Si son válidas → Se genera JWT firmado (válido 8 horas)
4. Frontend guarda el token en localStorage
5. Todas las peticiones posteriores envían: Authorization: Bearer <token>
6. El middleware verifyToken valida el token antes de procesar la petición
```

### Tabla de Permisos por Rol

| Operación | `admin` | `moderador` | `usuario` |
|---|---|---|---|
| Ver información de la liga | ✅ | ✅ | ✅ |
| Ver estadísticas | ✅ | ✅ | ✅ |
| Crear / Editar / Eliminar equipos | ✅ | ❌ | ❌ |
| Registrar jugadores | ✅ | ❌ | ❌ |
| Registrar presidentes | ✅ | ❌ | ❌ |
| Crear partidos y goles | ✅ | ❌ | ❌ |

---

## 💻 Instalación y Configuración

### Prerrequisitos
- **Node.js** v18 o superior
- **MySQL Workbench** instalado y corriendo
- **Git**

### Paso 1 — Clonar el repositorio
```bash
git clone https://github.com/TheGhostPem/parcial-segundo-corte.git
cd parcial-segundo-corte
```

### Paso 2 — Configurar la Base de Datos en MySQL Workbench

> ⚠️ Este paso es **obligatorio**. Sin él la app no tendrá datos.

1. **Abre MySQL Workbench** y conéctate a tu servidor local (`localhost`).

2. **Crea la base de datos y las tablas:**
   - En el menú superior ve a **File → Open SQL Script**
   - Navega hasta la carpeta del proyecto y abre el archivo: `database/schema.sql`
   - Haz clic en el **rayo (⚡ Execute)** para ejecutarlo
   - Esto crea la base de datos `parcial2_raul` con todas sus tablas

3. **Carga los datos de prueba (equipos, jugadores, partidos, etc.):**
   - Ve de nuevo a **File → Open SQL Script**
   - Abre el archivo: `database/seeds.sql`
   - Haz clic en el **rayo (⚡ Execute)** para ejecutarlo
   - Esto inserta todos los datos iniciales en la base de datos

4. **Verifica** que en el panel izquierdo de Workbench aparezca la base de datos `parcial2_raul` con sus tablas (`equipo`, `jugador`, `presidente`, `partido`, `gol`, `usuarios`).

### Paso 3 — Configurar el Backend

```bash
cd backend
npm install
```

**Crear el archivo de variables de entorno:**
1. Dentro de la carpeta `backend/` encontrarás el archivo `.env.example`
2. **Cópialo y renómbralo a `.env`**
3. Ábrelo y cambia **solo** la línea `DB_PASS` con tu contraseña de MySQL local:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_de_mysql   ← ⚠️ CAMBIA SOLO ESTA LÍNEA
DB_NAME=parcial2_raul
JWT_SECRET=generic_architecture_key_2026
```

Luego inicia el servidor:
```bash
npm run dev
```
> ✅ El servidor arranca en `http://localhost:5000`, sincroniza la BD y crea el usuario **admin / 123456** automáticamente.

### Paso 4 — Configurar el Frontend
```bash
# En una nueva terminal
cd frontend
npm install
npm run dev
```
> ✅ La aplicación estará disponible en `http://localhost:5173`. Entra con **admin / 123456** y verás todos los datos cargados.

---

## ⚙️ Variables de Entorno

El archivo `backend/.env.example` ya viene incluido en el repositorio como plantilla.
Solo cópialo, renómbralo a `.env` y cambia `DB_PASS` con tu contraseña de MySQL local:

```env
# Puerto del servidor Express
PORT=5000

# Configuración de la Base de Datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña_mysql   ← Solo cambia esto
DB_NAME=parcial2_raul

# Clave secreta para firmar los tokens JWT
JWT_SECRET=una_clave_secreta_muy_larga_y_segura
```

> ⚠️ **Nunca subas el archivo `.env` real a GitHub.** El archivo ya está incluido en `.gitignore`.

---

## 🔑 Credenciales por Defecto

Al iniciar el servidor por primera vez, se crea automáticamente un usuario administrador:

| Campo | Valor |
|---|---|
| **Usuario** | `admin` |
| **Contraseña** | `123456` |
| **Rol** | `admin` |

> Se recomienda cambiar esta contraseña en un entorno de producción.

---

## 📁 Estructura de Directorios

```
parcial-segundo-corte/
│
├── backend/                        # Servidor API REST
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Conexión Sequelize a MySQL
│   │   ├── controllers/
│   │   │   ├── authController.js   # Login y registro de usuarios
│   │   │   └── leagueController.js # CRUD de todas las entidades de liga
│   │   ├── middleware/
│   │   │   ├── verifyToken.js      # Middleware de autenticación JWT
│   │   │   └── checkRole.js        # Middleware de autorización por rol
│   │   ├── models/
│   │   │   ├── Equipo.js           # Modelo ORM: Equipo
│   │   │   ├── Jugador.js          # Modelo ORM: Jugador
│   │   │   ├── Presidente.js       # Modelo ORM: Presidente
│   │   │   ├── Partido.js          # Modelo ORM: Partido
│   │   │   ├── Gol.js              # Modelo ORM: Gol
│   │   │   └── Usuario.js          # Modelo ORM: Usuario
│   │   └── routes/
│   │       └── api.js              # Definición de todos los endpoints REST
│   ├── .env                        # Variables de entorno (NO incluir en Git)
│   ├── server.js                   # Punto de entrada: servidor + relaciones BD
│   └── package.json
│
├── frontend/                       # Aplicación SPA React + Vite
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js              # Instancia Axios configurada con base URL
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Vista de inicio de sesión
│   │   │   ├── Register.jsx        # Vista de registro de usuario
│   │   │   ├── LeagueDashboard.jsx # Dashboard de equipos y presidentes
│   │   │   ├── PlayersDashboard.jsx# Dashboard de jugadores
│   │   │   └── CompetitionDashboard.jsx # Dashboard de partidos y goles
│   │   ├── App.jsx                 # Componente raíz: sesión, navegación y vistas
│   │   ├── main.jsx                # Punto de entrada de React
│   │   └── index.css               # Estilos globales base
│   ├── tailwind.config.js          # Configuración de colores y plugins Tailwind
│   └── package.json
│
├── database/
│   ├── schema.sql                  # Script DDL: creación de tablas
│   └── seeds.sql                   # Script DML: datos de prueba iniciales
│
├── docs/
│   └── entidad__relation.jpg       # Diagrama Entidad-Relación del proyecto
│
├── .gitignore
└── README.md                       # Este documento
```

---

<div align="center">
  <sub>Desarrollado como proyecto académico · Parcial Segundo Corte · 2026</sub>
</div>
