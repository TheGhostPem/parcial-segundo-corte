const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Partido = sequelize.define('Partido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
  },
  goles_local: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  goles_visitante: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'partido',
  timestamps: false,
});

module.exports = Partido;
