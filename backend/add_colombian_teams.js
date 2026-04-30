const sequelize = require('./src/config/db');
const Equipo = require('./src/models/Equipo');
const Presidente = require('./src/models/Presidente');
const Jugador = require('./src/models/Jugador');

async function addTeams() {
  try {
    await Equipo.bulkCreate([
      { codigo: 'NAL', nombre: 'Atlético Nacional', estadio: 'Atanasio Girardot', aforo: 45000, año_fundacion: 1947, ciudad: 'Medellín' },
      { codigo: 'JUN', nombre: 'Junior de Barranquilla', estadio: 'Metropolitano', aforo: 46692, año_fundacion: 1924, ciudad: 'Barranquilla' }
    ], { ignoreDuplicates: true });
    
    // Agregar un par de jugadores y presidentes para que no se vean vacíos en el dashboard
    await Presidente.bulkCreate([
      { dni: 'P6', nombre: 'Mauricio', apellidos: 'Navarro', año_inicio: 2022, equipo_codigo: 'NAL' },
      { dni: 'P7', nombre: 'Alejandro', apellidos: 'Arteta', año_inicio: 2020, equipo_codigo: 'JUN' }
    ], { ignoreDuplicates: true });

    await Jugador.bulkCreate([
      { codigo: 'J6', nombre: 'Dorlan Pabón', posicion: 'Delantero', equipo_codigo: 'NAL' },
      { codigo: 'J7', nombre: 'Carlos Bacca', posicion: 'Delantero', equipo_codigo: 'JUN' }
    ], { ignoreDuplicates: true });

    console.log('Equipos añadidos correctamente');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}
addTeams();
