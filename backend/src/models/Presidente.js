/**
 * @fileoverview Modelo de base de datos para la entidad 'Presidente'.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa a un presidente de un equipo de fútbol.
 * Define la estructura de la tabla 'presidente'.
 *
 * @typedef {Object} Presidente
 * @property {string} dni - Documento Nacional de Identidad del presidente (Clave Primaria).
 * @property {string} nombre - Nombre del presidente.
 * @property {string} apellidos - Apellidos del presidente.
 * @property {Date} fecha_nacimiento - Fecha de nacimiento.
 * @property {number} año_inicio - Año en que asumió la presidencia.
 */
const Presidente = sequelize.define('Presidente', {
  dni: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY
  },
  año_inicio: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'presidente',
  timestamps: false
});

module.exports = Presidente;
