/**
 * @fileoverview Script de utilidad para actualizar manualmente el resultado de un partido específico.
 * Se utilizó para forzar un escenario de prueba (Real Madrid vs Barcelona).
 */

const sequelize = require('./src/config/db');
const Partido = require('./src/models/Partido');
const Gol = require('./src/models/Gol');

/**
 * Busca un partido por sus códigos de equipo, actualiza los goles y recrea
 * el historial de los autores de los goles.
 * 
 * @async
 * @function updateMatch
 */
async function updateMatch() {
  try {
    const partido = await Partido.findOne({ where: { equipo_local_codigo: 'RM', equipo_visitante_codigo: 'FCB' } });
    if (partido) {
      partido.goles_local = 1;
      partido.goles_visitante = 3;
      await partido.save();

      await Gol.destroy({ where: { partido_id: partido.id } });
      await Gol.bulkCreate([
        { minuto: 12, descripcion: 'Tiro libre al ángulo', partido_id: partido.id, jugador_codigo: 'J1' }, // Vinicius
        { minuto: 33, descripcion: 'Cabezazo potente', partido_id: partido.id, jugador_codigo: 'J2' }, // Lewandowski
        { minuto: 67, descripcion: 'Remate dentro del área', partido_id: partido.id, jugador_codigo: 'J2' },
        { minuto: 88, descripcion: 'Jugada individual épica', partido_id: partido.id, jugador_codigo: 'J2' }
      ]);
      console.log('Partido actualizado: RM 1 - 3 FCB');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}
updateMatch();
