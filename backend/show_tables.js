/**
 * @fileoverview Script de utilidad para listar las tablas existentes en la base de datos.
 * Útil para verificar desde consola si la sincronización de Sequelize creó las tablas.
 */

const sequelize = require('./src/config/db');

/**
 * Ejecuta la consulta SQL 'SHOW TABLES;' e imprime el listado de tablas.
 * 
 * @async
 * @function show
 */
async function show() {
  try {
    const [tables] = await sequelize.query('SHOW TABLES;');
    console.log(tables);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
show();
