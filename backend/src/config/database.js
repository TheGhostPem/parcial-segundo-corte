/**
 * @fileoverview Configuración alternativa de la conexión a la base de datos utilizando Sequelize.
 * Funciona de manera idéntica a db.js.
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Instancia de Sequelize configurada para conectarse a la base de datos MySQL.
 * Toma los parámetros de conexión de las variables de entorno.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Cambiar a console.log para ver las consultas SQL generadas
  }
);

module.exports = sequelize;
