# 🏗️ Documentación de Arquitectura

## 1. Diagrama de 3 Capas
El sistema está dividido en tres niveles de responsabilidad:

1.  **Capa de Presentación (Frontend)**: 
    - Desarrollada en **React 18** con **Vite**.
    - Gestiona la interfaz de usuario, las validaciones de formularios y el estado de la sesión (LocalStorage).
    - Usa **TailwindCSS 3** para un diseño responsivo y premium.

2.  **Capa de Lógica de Negocio (Backend)**:
    - Servidor **Node.js** con **Express**.
    - Implementa controladores que procesan las peticiones y aplican reglas de seguridad.
    - Usa Middlewares para la verificación de **JWT** y control de **Roles**.

3.  **Capa de Persistencia (Base de Datos)**:
    - **MySQL 8**.
    - Usa **Sequelize** como ORM para mapear los objetos del código a las tablas de la base de datos.

---

## 2. Endpoints de la API

| Método | URL | Body (Ejemplo) | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | `{ usuario, password }` | Autenticación y entrega de Token. |
| `POST` | `/api/register` | `{ usuario, password, rol }` | Registro de nuevos usuarios. |
| `GET` | `/api/info` | - | Lista todos los equipos con sus jugadores. |
| `GET` | `/api/stats` | - | Retorna conteos totales para el Dashboard. |
| `POST` | `/api/equipos` | `{ nombre, codigo, ... }` | Crea un equipo (Solo Admin). |
| `PUT` | `/api/equipos/:id` | `{ nombre, ... }` | Edita un equipo (Solo Admin). |
| `DELETE` | `/api/equipos/:id` | - | Elimina un equipo (Solo Admin). |

---

## 3. Justificación de Decisiones Técnicas
-   **JWT (JSON Web Token)**: Elegido para manejar sesiones sin estado (stateless), lo que permite una mayor escalabilidad y seguridad en aplicaciones modernas.
-   **Bcrypt**: Se utiliza para el hashing de contraseñas con un factor de coste de 10, asegurando que las claves nunca se guarden en texto plano.
-   **SweetAlert2**: Implementado para mejorar la experiencia de usuario (UX) mediante notificaciones elegantes y ventanas de confirmación no intrusivas.
-   **Arquitectura de Carpetas**: Separación clara por responsabilidades (MVC) para facilitar el mantenimiento y la escalabilidad del proyecto.

---

## 4. Modelo Entidad-Relación (Lógico)
-   **Equipo (1) --- (1) Presidente**: Relación uno a uno.
-   **Equipo (1) --- (N) Jugador**: Relación uno a muchos.
-   **Equipo (N) --- (N) Partido**: (A través de la tabla intermedia de partidos).
