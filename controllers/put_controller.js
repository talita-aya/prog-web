const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')

// -------------------------------------------------------------------------------------------------------
// editar infos do user (rota protegida, precisa do token e precisa ser admin)
const editUser = async (req, res) => {
  try {
    const { id } = req.params 
    const { name, age, email, username, password, role } = req.body 

    const putUser = await userModel.findByPk(id) 

    if (!putUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" }) 
    }

    putUser.name = name 
    putUser.age = age 
    putUser.email = email 
    putUser.username = username 
    putUser.role = role 

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10) 
      putUser.password = hashedPassword 
    }

    await putUser.save()  //salvando no bd

    res.status(200).json({ mensagem: putUser }) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
} 

// -------------------------------------------------------------------------------------------------------
// editar infos do próprio user (rota protegida, precisa do token e não pode alterar infos de outra pessoa)
const editMe = async (req, res) => {
  try {
    const { username } = req.params 
    const { name, age, email, password } = req.body 
    const token = req.headers.authorization 

    if (!token) {
      return res.status(401).json({ mensagem: "Nenhum token informado" }) 
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: "Token inválido" }) 
      }

      const userLogado = await userModel.findOne({
        where: { username: decoded.username },
      }) 

      if (userLogado.username !== username) {
        return res
          .status(403)
          .json({
            mensagem:
              "Acesso negado, você não pode alterar dados de outro usuário",
          }) 
      }

      const putUser = await userModel.findOne({
        where: { username },
      }) 

      if (!putUser) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" }) 
      }

      putUser.name = name 
      putUser.age = age 
      putUser.email = email 
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10) 
        putUser.password = hashedPassword 
      }

      await putUser.save()  //salvando no bd

      res.status(200).json({ mensagem: putUser }) 
    }) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
} 

module.exports = {
  editMe,
  editUser
} 
