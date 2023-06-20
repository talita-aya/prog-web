const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')


// -------------------------------------------------------------------------------------------------------
// login (gera o token utilizado nas outras funções)
const loginMiddleware = (req, res, next) => {
  const token = req.headers.authorization 
  try {
    const jsonToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = jsonToken
    next()
  } catch (error) {
    res.status(401).json("Nenhum token informado")
  }
}

// -------------------------------------------------------------------------------------------------------
// checar se é admnistrador para que algumas ações sejam permitidas
const isAdmin = async (req, res, next) => {
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

    if (userLogado.role !== "admin") {
      return res
        .status(403)
        .json({ mensagem: "Acesso negado, você não é um admin" }) 
    }

    next() 
  }) 
}

// -------------------------------------------------------------------------------------------------------
// login (gera o token utilizado nas outras funções)
const login = async (req, res) => {
  const { username, password } = req.body 

  try {
    const existingUser = await userModel.findOne({
      where: {
        username
      },
    }) 

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Erro ao tentar fazer login" }) 
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password) 

    if (!passwordMatch) {
      return res.status(401).json({ mensagem: "Erro ao tentar fazer login" }) 
    }

    const token = jwt.sign(
      {
        username: existingUser.username,
      },
      process.env.JWT_KEY,
      { expiresIn: "190h" }
    ) 

    res.status(200).json({
      message: "Login realizado com sucesso",
      token: token,
    }) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
}


module.exports = {
  loginMiddleware, 
  isAdmin,
  login
}


