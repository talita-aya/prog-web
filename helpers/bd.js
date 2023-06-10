const Sequelize = require("sequelize")

const sequelize = new Sequelize ('pweb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
})

module.exports = sequelize