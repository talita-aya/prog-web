const userModel = require("../models/user_model")
const jwt = require("jsonwebtoken")
const sequelize = require('../helpers/bd')
require("dotenv").config()
const bcrypt = require('bcrypt')

// -------------------------------------------------------------------------------------------------------
// deletar um  user (rota protegida, precisa do token e precisa ser admin, não pode excluir outro admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params 
    const existingUser = await userModel.findOne({
      where: {
        id,
        role: "user",
      },
    }) 

    if (!existingUser) {
      return res
        .status(404)
        .json({ mensagem: "Erro ao excluir, user não existe ou é admin" }) 
    }

    await userModel.destroy({
      where: {
        id,
        role: "user",
      },
    }) 

    res.status(200).json({ mensagem: "User deletado com sucesso! ID: " + id }) 
  } catch (error) {
    return res.status(500).json({ mensagem: error.message }) 
  }
} 


module.exports = {
  deleteUser,
} 
