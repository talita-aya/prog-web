const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')

// -------------------------------------------------------------------------------------------------------
// criar 5 users na rota install
const post5Users = async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })  //cria a tabela no bd
    const users = [
      { name: "Fulano 2", age: 2, email: "fulano2@gmail.com", username: "fulano1", password: "fulano1", role: "user" },
      { name: "Fulano 3", age: 3, email: "fulano3@gmail.com", username: "fulano2", password: "fulano2", role: "user" },
      { name: "Fulano 1", age: 1, email: "fulano1@gmail.com", username: "fulano3", password: "fulano3", role: "user" },
      { name: "Fulano 4", age: 4, email: "fulano4@gmail.com", username: "fulano4", password: "fulano4", role: "user" },
      { name: "Fulano 5", age: 5, email: "fulano5@gmail.com", username: "fulano5", password: "fulano5", role: "user" },
    ] 

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return { ...user, password: hashedPassword }
      })
    ) 

    await userModel.bulkCreate(hashedUsers)

    next()  //encaminha para a próxima rota
  } catch (error) {
    res.status(500).json({ mensagem: error.message })
  }
}

// -------------------------------------------------------------------------------------------------------
// criar o primeiro admin automaticamente
const postUserAdmin = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({
      where: {
        username: "admin1",
      },
    }) 

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" })
    }

    const password = "admin1"  //senha original
    const hashedPassword = await bcrypt.hash(password, 10) //gera o hash da senha

    const newUser = await userModel.create({
      name: "admin1",
      age: "0",
      email: "admin@gmail.com",
      username: "admin1",
      password: hashedPassword, //usa o hash da senha
      role: "admin",
    }) 

    res.status(200).json(newUser)
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

module.exports = {
  postUserAdmin,
  post5Users
} 