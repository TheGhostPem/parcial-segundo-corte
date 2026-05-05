/**
 * @fileoverview Modelo de base de datos para la entidad 'Jugador'.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Representa un jugador de fútbol en la base de datos.
 * Define la estructura de la tabla 'jugador'.
 *
 * @typedef {Object} Jugador
 * @property {string} codigo - Código o ID único del jugador (Clave Primaria).
 * @property {string} nombre - Nombre completo del jugador.
 * @property {Date} fecha_nacimiento - Fecha de nacimiento del jugador.
 * @property {string} posicion - Posición en la que juega (ej. Delantero, Medio).
 */
const Jugador = sequelize.define('Jugador', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY
  },
  posicion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'jugador',
  timestamps: false
});

module.exports = Jugador;
