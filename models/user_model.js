const DataTypes = require("sequelize")
const sequelize = require('../helpers/bd')

// documentação sequelize -> model basics
const UsersModel = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
})

module.exports = UsersModel