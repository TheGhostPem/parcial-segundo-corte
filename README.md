# ⚽ Sistema de Gestión - Liga Profesional de Fútbol (FEF)

Este proyecto es una aplicación web de gestión deportiva desarrollada con una arquitectura de **3 capas**, cumpliendo con los requisitos del **Ejercicio 9** de la asignatura.

## 📋 Requisitos del Proyecto
- **Frontend**: React + Vite + TailwindCSS 3.
- **Backend**: Node.js + Express.
- **Base de Datos**: MySQL (Sequelize ORM).
- **Seguridad**: Autenticación JWT (8h) y encriptación Bcrypt.
- **Extras**: SweetAlert2 para confirmaciones y Control de Acceso por Roles (RBAC).

---

## 🚀 Guía de Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd "parcial raul"
```

### 2. Configurar la Base de Datos
1. Abre MySQL Workbench.
2. Ejecuta el script ubicado en `/database/schema.sql`.
3. (Opcional) Ejecuta `/database/seeds.sql` para datos iniciales.

### 3. Configurar el Backend
1. Ve a la carpeta `backend/`.
2. Crea un archivo `.env` basándote en `.env.example`:
   ```env
   DB_NAME=parcial2_raul
   DB_USER=root
   DB_PASS=tu_contraseña
   DB_HOST=localhost
   JWT_SECRET=tu_clave_secreta_2026
   PORT=5000
   ```
3. Instala dependencias y arranca:
   ```bash
   npm install
   npm run dev
   ```

### 4. Configurar el Frontend
1. Ve a la carpeta `frontend/`.
2. Instala dependencias y arranca:
   ```bash
   npm install
   npm run dev
   ```
3. Accede a `http://localhost:5173`.

---

## 🔐 Credenciales de Acceso (Pruebas)
| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | admin | 123456 |
| **Usuario** | (Crea uno en el Registro) | - |

---

## 📁 Estructura del Proyecto
- `/backend`: Servidor Express, controladores, modelos y rutas.
- `/frontend`: Aplicación React, componentes premium y lógica de cliente.
- `/database`: Scripts SQL para la creación y población de la BD.
- `/docs`: Documentación técnica de arquitectura.

---
*Desarrollado para el Parcial 2 - 2026*
