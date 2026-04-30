const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Equipo = sequelize.define('Equipo', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estadio: {
    type: DataTypes.STRING
  },
  aforo: {
    type: DataTypes.INTEGER
  },
  año_fundacion: {
    type: DataTypes.INTEGER
  },
  ciudad: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'equipo',
  timestamps: false
});

module.exports = Equipo;
