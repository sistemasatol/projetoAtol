const Sequelize = require('sequelize');

const database = new Sequelize('projetoAtol', 'root', '*Hksjj2105', {
      host: 'localhost',
      dialect: 'mysql'
});
database.sync({ force: false }) 
      .then(() => {
            console.log("Sincronização com o banco de dados realizada com sucesso!");
      })
      .catch((err) => {
            console.error("Erro ao sincronizar com o banco de dados:", err);
      });

module.exports = database;