const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/Database');
const Empresa = require('./EmpresaModel');
const Obra = require('./ObraModel');
const Funcao = require('./FuncaoModel');

const Colaborador = database.define('Colaboradores', {
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
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_contrato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  num_documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  obraId: {
    type: Sequelize.INTEGER,
    references: {
      model: Obra,
      key: 'id',
    },
  },
  empresaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Empresa,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
  },
  obs: {
    type: DataTypes.STRING,
  },
  funcaoId: {
    type: Sequelize.INTEGER,
    references: {
      model: Funcao,
      key: 'id',
    },
  },
});

// Configura as associações entre os modelos
Colaborador.belongsTo(Empresa, { foreignKey: 'empresaId' });
Colaborador.belongsTo(Obra, { foreignKey: 'obraId' });
Colaborador.belongsTo(Funcao, { foreignKey: 'funcaoId' });

module.exports = Colaborador;
