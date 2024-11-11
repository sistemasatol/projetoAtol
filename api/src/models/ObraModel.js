const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/Database');

const Obra = database.define('Obra', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Obra;
