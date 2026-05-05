/**
 * @fileoverview Controlador principal para la gestión de la Liga de Fútbol.
 * Contiene la lógica para obtener estadísticas, información de la liga,
 * jugadores, partidos, y realizar operaciones CRUD sobre estas entidades.
 */

const Equipo = require('../models/Equipo');
const Jugador = require('../models/Jugador');
const Presidente = require('../models/Presidente');
const Partido = require('../models/Partido');
const Gol = require('../models/Gol');

// Estándar de respuesta: { success, data, message }

/**
 * Obtiene estadísticas generales de la liga.
 * 
 * @async
 * @function obtenerEstadisticas
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const totalEquipos = await Equipo.count();
    const totalJugadores = await Jugador.count();
    const totalPresidentes = await Presidente.count();
    res.status(200).json({ 
      success: true, 
      data: { totalEquipos, totalJugadores, totalPresidentes }, 
      message: 'Estadísticas obtenidas correctamente' 
    });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error en estadísticas' });
  }
};

/**
 * Obtiene la información completa de la liga (equipos con sus presidentes y jugadores).
 * 
 * @async
 * @function obtenerInformacionLiga
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.obtenerInformacionLiga = async (req, res) => {
  try {
    const equipos = await Equipo.findAll({
      include: [
        { model: Presidente, as: 'presidente' },
        { model: Jugador, as: 'jugadores' }
      ],
      order: [['nombre', 'ASC']]
    });
    res.status(200).json({ 
      success: true, 
      data: equipos, 
      message: 'Registros obtenidos correctamente' 
    });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error al consultar la base de datos' });
  }
};

/**
 * Obtiene la lista de todos los jugadores junto con el nombre de su equipo.
 * 
 * @async
 * @function obtenerJugadores
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.obtenerJugadores = async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      include: [
        { model: Equipo, as: 'equipo', attributes: ['nombre'] }
      ],
      order: [['nombre', 'ASC']]
    });
    res.status(200).json({
      success: true,
      data: jugadores,
      message: 'Jugadores obtenidos correctamente'
    });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error al obtener jugadores' });
  }
};

/**
 * Obtiene el historial de partidos, incluyendo equipos, resultados y goles.
 * 
 * @async
 * @function obtenerPartidos
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.obtenerPartidos = async (req, res) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        { model: Equipo, as: 'equipo_local', attributes: ['nombre', 'codigo'] },
        { model: Equipo, as: 'equipo_visitante', attributes: ['nombre', 'codigo'] },
        { 
          model: Gol, 
          as: 'goles',
          include: [{ model: Jugador, as: 'anotador', attributes: ['nombre', 'posicion'] }]
        }
      ],
      order: [['fecha', 'DESC']]
    });
    res.status(200).json({ success: true, data: partidos, message: 'Partidos obtenidos' });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error al obtener partidos' });
  }
};

/**
 * Crea un nuevo equipo en la base de datos.
 * 
 * @async
 * @function crearEquipo
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.crearEquipo = async (req, res) => {
  try {
    const nuevo = await Equipo.create(req.body);
    res.status(201).json({ success: true, data: nuevo, message: 'Equipo creado con éxito' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al crear el registro' });
  }
};

/**
 * Actualiza los datos de un equipo existente.
 * 
 * @async
 * @function editarEquipo
 * @param {Object} req - Objeto de petición. req.params.codigo contiene el ID.
 * @param {Object} res - Objeto de respuesta.
 */
exports.editarEquipo = async (req, res) => {
  try {
    await Equipo.update(req.body, { where: { codigo: req.params.codigo } });
    res.status(200).json({ success: true, data: null, message: 'Registro actualizado correctamente' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al actualizar el registro' });
  }
};

/**
 * Elimina un equipo de la base de datos.
 * 
 * @async
 * @function eliminarEquipo
 * @param {Object} req - Objeto de petición. req.params.codigo contiene el ID.
 * @param {Object} res - Objeto de respuesta.
 */
exports.eliminarEquipo = async (req, res) => {
  try {
    await Equipo.destroy({ where: { codigo: req.params.codigo } });
    res.status(200).json({ success: true, data: null, message: 'Registro eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al eliminar el registro' });
  }
};

// ================= CRUD PRESIDENTE =================
/**
 * Asigna o crea un nuevo presidente para un equipo.
 * 
 * @async
 * @function crearPresidente
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.crearPresidente = async (req, res) => {
  try {
    const nuevo = await Presidente.create(req.body);
    res.status(201).json({ success: true, data: nuevo, message: 'Presidente asignado con éxito' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al asignar presidente' });
  }
};

// ================= CRUD JUGADOR =================
/**
 * Registra o ficha un nuevo jugador en un equipo.
 * 
 * @async
 * @function crearJugador
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.crearJugador = async (req, res) => {
  try {
    const nuevo = await Jugador.create(req.body);
    res.status(201).json({ success: true, data: nuevo, message: 'Jugador fichado con éxito' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al fichar jugador' });
  }
};

// ================= CRUD PARTIDO =================
/**
 * Programa o registra un nuevo partido entre dos equipos.
 * 
 * @async
 * @function crearPartido
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.crearPartido = async (req, res) => {
  try {
    const nuevo = await Partido.create(req.body);
    res.status(201).json({ success: true, data: nuevo, message: 'Partido programado con éxito' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al programar partido' });
  }
};

// ================= CRUD GOL =================
/**
 * Registra un gol anotado en un partido.
 * Además, actualiza automáticamente el marcador (goles_local o goles_visitante)
 * del partido correspondiente dependiendo del equipo al que pertenece el jugador.
 * 
 * @async
 * @function crearGol
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.crearGol = async (req, res) => {
  try {
    const nuevo = await Gol.create(req.body);
    // Auto update match score based on home/away status of the scorer
    const partido = await Partido.findByPk(nuevo.partido_id);
    const jugador = await Jugador.findOne({ where: { codigo: nuevo.jugador_codigo } });
    
    if (partido && jugador) {
      if (jugador.equipo_codigo === partido.equipo_local_codigo) {
        partido.goles_local += 1;
      } else if (jugador.equipo_codigo === partido.equipo_visitante_codigo) {
        partido.goles_visitante += 1;
      }
      await partido.save();
    }
    
    res.status(201).json({ success: true, data: nuevo, message: 'Gol registrado con éxito' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'Error al registrar gol' });
  }
};

/**
 * Función de utilidad para limpiar la base de datos e insertar datos
 * iniciales (semilla o "seed") para realizar pruebas rápidas.
 * Advertencia: Elimina todos los registros existentes.
 * 
 * @async
 * @function sembrarBaseDeDatos
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.sembrarBaseDeDatos = async (req, res) => {
  try {
    await Gol.destroy({ where: {} });
    await Partido.destroy({ where: {} });
    await Jugador.destroy({ where: {} });
    await Presidente.destroy({ where: {} });
    await Equipo.destroy({ where: {} });

    await Equipo.bulkCreate([
      { codigo: 'RM', nombre: 'Real Madrid', estadio: 'Santiago Bernabéu', aforo: 81044, año_fundacion: 1902, ciudad: 'Madrid' },
      { codigo: 'FCB', nombre: 'FC Barcelona', estadio: 'Spotify Camp Nou', aforo: 99354, año_fundacion: 1899, ciudad: 'Barcelona' },
      { codigo: 'ATM', nombre: 'Atlético de Madrid', estadio: 'Cívitas Metropolitano', aforo: 68456, año_fundacion: 1903, ciudad: 'Madrid' },
      { codigo: 'LDU', nombre: 'Liga de Quito', estadio: 'Rodrigo Paz Delgado', aforo: 41575, año_fundacion: 1918, ciudad: 'Quito' },
      { codigo: 'BSC', nombre: 'Barcelona SC', estadio: 'Monumental', aforo: 57267, año_fundacion: 1925, ciudad: 'Guayaquil' }
    ]);

    await Presidente.bulkCreate([
      { dni: 'P1', nombre: 'Florentino', apellidos: 'Pérez', año_inicio: 2000, equipo_codigo: 'RM' },
      { dni: 'P2', nombre: 'Joan', apellidos: 'Laporta', año_inicio: 2021, equipo_codigo: 'FCB' },
      { dni: 'P3', nombre: 'Enrique', apellidos: 'Cerezo', año_inicio: 2003, equipo_codigo: 'ATM' },
      { dni: 'P4', nombre: 'Isaac', apellidos: 'Álvarez', año_inicio: 2024, equipo_codigo: 'LDU' },
      { dni: 'P5', nombre: 'Antonio', apellidos: 'Álvarez', año_inicio: 2024, equipo_codigo: 'BSC' }
    ]);

    await Jugador.bulkCreate([
      { codigo: 'J1', nombre: 'Vinícius Júnior', posicion: 'Delantero', equipo_codigo: 'RM' },
      { codigo: 'J2', nombre: 'Robert Lewandowski', posicion: 'Delantero', equipo_codigo: 'FCB' },
      { codigo: 'J3', nombre: 'Antoine Griezmann', posicion: 'Delantero', equipo_codigo: 'ATM' },
      { codigo: 'J4', nombre: 'Alex Arce', posicion: 'Delantero', equipo_codigo: 'LDU' },
      { codigo: 'J5', nombre: 'Damián Díaz', posicion: 'Centrocampista', equipo_codigo: 'BSC' }
    ]);

    const partido1 = await Partido.create({
      fecha: '2026-05-15',
      goles_local: 1,
      goles_visitante: 3,
      equipo_local_codigo: 'RM',
      equipo_visitante_codigo: 'FCB'
    });

    await Gol.bulkCreate([
      { minuto: 12, descripcion: 'Tiro libre al ángulo', partido_id: partido1.id, jugador_codigo: 'J1' },
      { minuto: 33, descripcion: 'Cabezazo potente', partido_id: partido1.id, jugador_codigo: 'J2' },
      { minuto: 67, descripcion: 'Remate dentro del área', partido_id: partido1.id, jugador_codigo: 'J2' },
      { minuto: 88, descripcion: 'Jugada individual épica', partido_id: partido1.id, jugador_codigo: 'J2' }
    ]);

    res.status(200).json({ success: true, data: null, message: 'Base de datos poblada con éxito' });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error al sembrar datos' });
  }
};
