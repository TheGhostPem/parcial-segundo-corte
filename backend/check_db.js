const sequelize = require('./src/config/db');
const Equipo = require('./src/models/Equipo');
const Jugador = require('./src/models/Jugador');

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
