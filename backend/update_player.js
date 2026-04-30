const sequelize = require('./src/config/db');
const Jugador = require('./src/models/Jugador');

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
