/**
 * @fileoverview Modelo de base de datos para la entidad 'Gol'.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa un gol anotado en un partido específico.
 * Define la estructura de la tabla 'gol'.
 *
 * @typedef {Object} Gol
 * @property {number} id - Identificador único del gol (Clave Primaria, autoincremental).
 * @property {number} minuto - Minuto del partido en el que se anotó el gol.
 * @property {string} descripcion - Descripción adicional sobre cómo fue el gol.
 */
const Gol = sequelize.define('Gol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  minuto: {
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'gol',
  timestamps: false,
});

module.exports = Gol;
