const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',  
    // SQLite only
    storage: 'database/localstorage.sqlite'
  });

  module.exports = sequelize;