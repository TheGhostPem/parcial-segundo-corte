const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const apiRoutes = require('./src/routes/api');
const bcrypt = require('bcryptjs');

// Importar modelos (Importante para Sequelize)
const Usuario = require('./src/models/Usuario');
const Equipo = require('./src/models/Equipo');
const Jugador = require('./src/models/Jugador');
const Presidente = require('./src/models/Presidente');
const Partido = require('./src/models/Partido');
const Gol = require('./src/models/Gol');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());

// Definir Relaciones
Equipo.hasOne(Presidente, { foreignKey: 'equipo_codigo', as: 'presidente' });
Presidente.belongsTo(Equipo, { foreignKey: 'equipo_codigo', as: 'equipo' });

Equipo.hasMany(Jugador, { foreignKey: 'equipo_codigo', as: 'jugadores' });
Jugador.belongsTo(Equipo, { foreignKey: 'equipo_codigo', as: 'equipo' });

// Relaciones de Partido
Partido.belongsTo(Equipo, { foreignKey: 'equipo_local_codigo', as: 'equipo_local' });
Partido.belongsTo(Equipo, { foreignKey: 'equipo_visitante_codigo', as: 'equipo_visitante' });

// Relaciones de Gol
Partido.hasMany(Gol, { foreignKey: 'partido_id', as: 'goles' });
Gol.belongsTo(Partido, { foreignKey: 'partido_id', as: 'partido' });

Gol.belongsTo(Jugador, { foreignKey: 'jugador_codigo', as: 'anotador' });

// API Routes
app.use('/api', apiRoutes);

// Asegurar usuario Admin inicial
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

// Iniciar Servidor
const iniciar = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ BD Sincronizada');
    await asegurarAdmin();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error de Inicio:', err);
  }
};

iniciar();
