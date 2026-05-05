/**
 * @fileoverview Script de utilidad para consultar la estructura de las tablas directamente.
 * Ejecuta consultas SQL crudas (Raw Queries) en MySQL para mostrar el esquema de las tablas.
 */

const sequelize = require('./src/config/db');

/**
 * Describe las tablas 'partido' y 'gol' utilizando el comando nativo de MySQL 'DESCRIBE'
 * e imprime el resultado en formato de tabla en la consola.
 * 
 * @async
 * @function describe
 */
async function describe() {
  try {
    const [partido] = await sequelize.query('DESCRIBE partido;');
    console.log('PARTIDO SCHEMA:');
    console.table(partido);

    const [gol] = await sequelize.query('DESCRIBE gol;');
    console.log('GOL SCHEMA:');
    console.table(gol);
  } catch (err) {
    console.error('Error fetching schema:', err);
  } finally {
    process.exit();
  }
}
describe();
