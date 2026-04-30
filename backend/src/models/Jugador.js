const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Jugador = sequelize.define('Jugador', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY
  },
  posicion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'jugador',
  timestamps: false
});

module.exports = Jugador;
