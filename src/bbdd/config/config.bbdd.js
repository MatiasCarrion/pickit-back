// Archivo con la configuración y conexión a base de datos.
const { Sequelize } = require('sequelize');
const config = require('./../../config/index');

const sequelize = new Sequelize(
  config.bbdd.dbname,
  config.bbdd.user,
  config.bbdd.password,
  {
    host: config.bbdd.host,
    dialect: config.bbdd.dialect
    });

module.exports = sequelize;