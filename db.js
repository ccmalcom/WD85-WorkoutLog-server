const Sequelize = require('sequelize');

const sequilize = new Sequelize('postgres://postgres:password@localhost:5432/workout-log')

module.exports = sequilize;