/**
 * @fileoverview Script de utilidad para verificar el estado de la base de datos.
 * Realiza un conteo rápido para asegurar que la conexión y los modelos funcionan.
 */

const sequelize = require('./src/config/db');
const Equipo = require('./src/models/Equipo');
const Jugador = require('./src/models/Jugador');

/**
 * Función para probar la conectividad y contar registros básicos.
 * 
 * @async
 * @function test
 */
async function test() {
  try {
    const equipos = await Equipo.count();
    const jugadores = await Jugador.count();
    console.log(`Equipos: ${equipos}, Jugadores: ${jugadores}`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
test();
