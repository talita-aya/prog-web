const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')

// -------------------------------------------------------------------------------------------------------
// criar user (rota protegida, precisa do token)
const postUser = async (req, res) => {
  const { name, age, email, username, password, role } = req.body 

  try {
    const existingUser = await userModel.findOne({
      where: {
        username,
      },
    }) 

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" }) 
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if(err) {
        return res.status(500).json({ mensagem: err })
      }
      else {
        const newUser = await userModel.create({
          name: name,
          age: age,
          email: email,
          username: username,
          password: hash,
          role: "user",
        }) 
    
        res.status(200).json(newUser) 
      }
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
}

// -------------------------------------------------------------------------------------------------------
// criar outros admin (rota protegida, precisa do token e precisa ser admin)
const postOthersAdmin = async (req, res) => {
  const { name, age, email, username, password } = req.body 

  try {
    const existingUser = await userModel.findOne({
      where: {
        username,
      },
    }) 

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" }) 
    }

    const hashedPassword = await bcrypt.hash(password, 10)  //gerar o hash da senha

    const newUser = await userModel.create({
      name: name,
      age: age,
      email: email,
      username: username,
      password: hashedPassword, //usa o hash da senha
      role: "admin",
    }) 

    res.status(200).json(newUser) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

// -------------------------------------------------------------------------------------------------------
// criar outros admin (rota protegida, precisa do token e precisa ser admin)
const updateAge = async (req, res) => {
  try {
    const { username } = req.body

    const existingUser = await userModel.findOne({
      where: {
        username: username,
      },
    }) 

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" }) 
    }

    existingUser.age += 1 
    existingUser.lastLogin = new Date() 

    await existingUser.save() 

    res.status(200).json(existingUser) 
  } catch (error) {
    res.status(500).json({ mensagem: error.message }) 
  }
}


module.exports = {
 postUser,
 postOthersAdmin,
 updateAge
} 
