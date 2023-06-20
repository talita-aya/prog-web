const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')

// -------------------------------------------------------------------------------------------------------
// listar todos os usuários
const getUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1 //página atual (padrão: 1)
  const limit = parseInt(req.query.limit) || 10 //número de registros por página (padrão: 10)
  const offset = (page - 1) * limit  //deslocamento para a página atual

  try {
    const { count, rows } = await userModel.findAndCountAll({
      offset,
      limit,
    }) 

    res.status(200).json({
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users: rows,
    }) 
    //http://localhost:3000/users?page=2&limit=5
    //retorna página 2 com 5 usuários por página (a partir do décimo usuário da lista geral)
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
} 

// -------------------------------------------------------------------------------------------------------
// listar usuário pelo ID (rota protegida, precisa do token)
const getUserID = async (req, res) => {
  try {
    const { id } = req.params 
    const userID = await userModel.findOne({
      where: {
        id,
      },
    }) 

    if (!userID) {
      return res.status(404).json({ mensagem: "Este usuário não existe" }) 
    }

    res.status(200).json(userID) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
} 

// -------------------------------------------------------------------------------------------------------
// listar usuário e idade (rota protegida, precisa do token)
const getNameAge = async (req, res) => {
  try {
    const users = await userModel.findAll() 

    const processamentoDados = users.map(user => {
      const age = parseInt(user.age)
      const fullName = `${user.name} (${age} anos)` 
      return {
        fullName,
        email: user.email,
      } 
    }) 

    res.status(200).json(processamentoDados) 
  } catch (error) {
    res.status(500).json({ mensagem: error.message }) 
  }
} 


module.exports = {
  getUser,
  getUserID,
  getNameAge
} 
