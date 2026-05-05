/**
 * @fileoverview Modelo de base de datos para la entidad 'Partido'.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa un encuentro (partido) entre dos equipos.
 * Define la estructura de la tabla 'partido'.
 *
 * @typedef {Object} Partido
 * @property {number} id - Identificador único del partido (Clave Primaria, autoincremental).
 * @property {Date} fecha - Fecha en la que se juega o se jugó el partido.
 * @property {number} goles_local - Cantidad de goles marcados por el equipo local.
 * @property {number} goles_visitante - Cantidad de goles marcados por el equipo visitante.
 */
const Partido = sequelize.define('Partido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
  },
  goles_local: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  goles_visitante: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'partido',
  timestamps: false,
});

module.exports = Partido;
