const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('controle_financeiro', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
