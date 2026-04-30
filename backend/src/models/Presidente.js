const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Presidente = sequelize.define('Presidente', {
  dni: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY
  },
  año_inicio: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'presidente',
  timestamps: false
});

module.exports = Presidente;
