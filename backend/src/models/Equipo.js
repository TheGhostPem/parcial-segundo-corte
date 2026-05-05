/**
 * @fileoverview Modelo de base de datos para la entidad 'Equipo'.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa un equipo de fútbol en la base de datos.
 * Define la estructura de la tabla 'equipo'.
 *
 * @typedef {Object} Equipo
 * @property {string} codigo - Código único del equipo (Clave Primaria).
 * @property {string} nombre - Nombre oficial del equipo.
 * @property {string} estadio - Nombre del estadio del equipo.
 * @property {number} aforo - Capacidad máxima del estadio.
 * @property {number} año_fundacion - Año en que se fundó el equipo.
 * @property {string} ciudad - Ciudad a la que pertenece el equipo.
 */
const Equipo = sequelize.define('Equipo', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estadio: {
    type: DataTypes.STRING
  },
  aforo: {
    type: DataTypes.INTEGER
  },
  año_fundacion: {
    type: DataTypes.INTEGER
  },
  ciudad: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'equipo',
  timestamps: false
});

module.exports = Equipo;
