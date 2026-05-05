/**
 * @fileoverview Configuración de la conexión a la base de datos utilizando Sequelize.
 * Establece la conexión con MySQL utilizando las variables de entorno.
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Instancia de Sequelize configurada para conectarse a la base de datos MySQL.
 * Toma los parámetros de conexión de las variables de entorno (DB_NAME, DB_USER, DB_PASS, DB_HOST).
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Desactiva el registro de consultas SQL en la consola
  }
);

module.exports = sequelize;
