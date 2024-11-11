const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetoAtol', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'
});

exports.default = sequelize;