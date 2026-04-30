const sequelize = require('./src/config/db');
const Equipo = require('./src/models/Equipo');
const Jugador = require('./src/models/Jugador');

async function addBayern() {
  try {
    await Equipo.bulkCreate([{
      codigo: 'BAY',
      nombre: 'Bayern Múnich',
      estadio: 'Allianz Arena',
      aforo: 75000,
      año_fundacion: 1900,
      ciudad: 'Múnich'
    }], { ignoreDuplicates: true });

    await Jugador.bulkCreate([
      { codigo: 'J8', nombre: 'Luis Díaz', posicion: 'Delantero', equipo_codigo: 'BAY' },
      { codigo: 'J9', nombre: 'Michael Olise', posicion: 'Extremo', equipo_codigo: 'BAY' }
    ], { ignoreDuplicates: true });
    
    console.log('Bayern Múnich añadido con Luis Díaz y Olise');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}
addBayern();
