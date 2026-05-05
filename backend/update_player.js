/**
 * @fileoverview Script de utilidad para actualizar la información de un jugador.
 * Útil para probar las sentencias de actualización de Sequelize directamente desde la consola.
 */

const sequelize = require('./src/config/db');
const Jugador = require('./src/models/Jugador');

/**
 * Actualiza el nombre de un jugador en específico (en este caso el jugador con código 'J6').
 * 
 * @async
 * @function updatePlayer
 */
async function updatePlayer() {
  try {
    await Jugador.update(
      { nombre: 'Marlos Moreno' },
      { where: { codigo: 'J6' } }
    );
    console.log('Jugador actualizado correctamente');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}
updatePlayer();
