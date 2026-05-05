/**
 * @fileoverview Modelo de base de datos para la entidad 'Usuario'.
 * Maneja la información de autenticación y autorización (roles).
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa un usuario del sistema (administrador, moderador o usuario regular).
 * Define la estructura de la tabla 'usuarios'.
 *
 * @typedef {Object} Usuario
 * @property {number} id - Identificador único autoincremental (Clave Primaria).
 * @property {string} usuario - Nombre de usuario (debe ser único).
 * @property {string} password - Contraseña encriptada (hash bcrypt).
 * @property {string} imagen - URL o ruta de la imagen de perfil del usuario.
 * @property {string} rol - Rol del usuario para control de acceso (admin, usuario, moderador).
 */
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario', 'moderador'),
    defaultValue: 'usuario'
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en'
});

module.exports = Usuario;
