const Sequelize = require("sequelize")

const sequelize = new Sequelize('pweb', 'postgres', 'tkuriki25', {
    host: "localhost",
    port: "5434",
    dialect: "postgres"
})

module.exports = sequelize