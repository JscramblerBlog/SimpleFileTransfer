const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const User = sequelize.define('user', {
    uid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username:  { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
    quota: {type: Sequelize.INTEGER, defaultValue: 104857600},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })

  module.exports = User;