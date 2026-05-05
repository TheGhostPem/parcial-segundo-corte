/**
 * @fileoverview Punto de entrada principal de la aplicación Backend.
 * Configura el servidor Express, middlewares, rutas de la API,
 * define las relaciones de la base de datos (Sequelize) y realiza
 * la sincronización inicial, asegurando la existencia de un usuario administrador.
 */

const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const bcrypt = require('bcryptjs');

// Importar modelos (Importante para que Sequelize los registre y pueda definir relaciones)
const Usuario = require('./src/models/Usuario');
const Equipo = require('./src/models/Equipo');
const Jugador = require('./src/models/Jugador');
const Presidente = require('./src/models/Presidente');
const Partido = require('./src/models/Partido');
const Gol = require('./src/models/Gol');

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Configuración de Middlewares
// ==========================================
app.use(cors()); // Permite peticiones de origen cruzado (Cross-Origin Resource Sharing)
app.use(express.json()); // Parsea los cuerpos de las peticiones entrantes en formato JSON

// ==========================================
// Definir Relaciones de Base de Datos
// ==========================================

// Relación: Equipo - Presidente (1 a 1)
Equipo.hasOne(Presidente, { foreignKey: 'equipo_codigo', as: 'presidente' });
Presidente.belongsTo(Equipo, { foreignKey: 'equipo_codigo', as: 'equipo' });

// Relación: Equipo - Jugador (1 a N)
Equipo.hasMany(Jugador, { foreignKey: 'equipo_codigo', as: 'jugadores' });
Jugador.belongsTo(Equipo, { foreignKey: 'equipo_codigo', as: 'equipo' });

// Relación: Partido - Equipo (N a 1) - Local y Visitante
Partido.belongsTo(Equipo, { foreignKey: 'equipo_local_codigo', as: 'equipo_local' });
Partido.belongsTo(Equipo, { foreignKey: 'equipo_visitante_codigo', as: 'equipo_visitante' });

// Relación: Partido - Gol (1 a N)
Partido.hasMany(Gol, { foreignKey: 'partido_id', as: 'goles' });
Gol.belongsTo(Partido, { foreignKey: 'partido_id', as: 'partido' });

// Relación: Gol - Jugador (N a 1)
Gol.belongsTo(Jugador, { foreignKey: 'jugador_codigo', as: 'anotador' });

// ==========================================
// Rutas de la API
// ==========================================
app.use('/api', apiRoutes); // Monta todas las rutas bajo el prefijo /api

/**
 * Función asíncrona para asegurar que exista al menos un usuario con rol de 'admin'
 * en la base de datos al iniciar el servidor.
 * Si no existe el usuario 'admin', lo crea con la contraseña '123456' hasheada.
 * @async
 * @function asegurarAdmin
 * @returns {Promise<void>}
 */
const asegurarAdmin = async () => {
  try {
    const hashed = await bcrypt.hash('123456', 10);
    await Usuario.findOrCreate({
      where: { usuario: 'admin' },
      defaults: { usuario: 'admin', password: hashed, rol: 'admin' }
    });
    console.log('👤 Admin verificado');
  } catch (err) {
    console.error('Error Admin:', err);
  }
};

/**
 * Función principal para iniciar el servidor web.
 * Se encarga de:
 * 1. Sincronizar los modelos con la base de datos (crear tablas si no existen).
 * 2. Verificar/Crear el usuario administrador por defecto.
 * 3. Poner la aplicación Express a escuchar en el puerto configurado.
 * @async
 * @function iniciar
 * @returns {Promise<void>}
 */
const iniciar = async () => {
  try {
    await sequelize.sync({ force: false }); // Sincroniza DB sin borrar datos existentes (force: false)
    console.log('✅ BD Sincronizada');
    await asegurarAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error de Inicio:', err);
  }
};

// Ejecutar la inicialización del servidor
iniciar();
