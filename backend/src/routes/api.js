/**
 * @fileoverview Definición de las rutas de la API (Endpoints).
 * Asocia cada ruta con su controlador correspondiente y aplica
 * los middlewares necesarios (autenticación y autorización).
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const leagueController = require('../controllers/leagueController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Rutas de Autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas de la Liga (Lectura para todos los logueados)
router.get('/info', verifyToken, leagueController.obtenerInformacionLiga);
router.get('/stats', verifyToken, leagueController.obtenerEstadisticas);
router.get('/jugadores', verifyToken, leagueController.obtenerJugadores);
router.get('/partidos', verifyToken, leagueController.obtenerPartidos);
router.post('/seed', leagueController.sembrarBaseDeDatos); // Sembrado libre para pruebas

// CRUD Equipos (Solo Admin y Moderador)
router.post('/equipos', [verifyToken, checkRole(['admin'])], leagueController.crearEquipo);
router.put('/equipos/:codigo', [verifyToken, checkRole(['admin'])], leagueController.editarEquipo);
router.delete('/equipos/:codigo', [verifyToken, checkRole(['admin'])], leagueController.eliminarEquipo);

// Nuevos Endpoints CRUD (Jugadores, Presidentes, Partidos, Goles)
router.post('/presidentes', [verifyToken, checkRole(['admin'])], leagueController.crearPresidente);
router.post('/jugadores', [verifyToken, checkRole(['admin'])], leagueController.crearJugador);
router.post('/partidos', [verifyToken, checkRole(['admin'])], leagueController.crearPartido);
router.post('/goles', [verifyToken, checkRole(['admin'])], leagueController.crearGol);

module.exports = router;
