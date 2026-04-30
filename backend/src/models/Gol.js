const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gol = sequelize.define('Gol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  minuto: {
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'gol',
  timestamps: false,
});

module.exports = Gol;
