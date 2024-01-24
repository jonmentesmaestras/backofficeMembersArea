const Sequelize = require('sequelize')
var connect={}

connect.sequelize = new Sequelize('sniper', 'jon', 'Runero!54Alien32.', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connect

