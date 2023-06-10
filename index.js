const express = require("express")
const app = require('./app')
const sequelize = require('./helpers/bd')
const usersModel = require('./models/user')

require("dotenv").config()

//documentação sequelize
async function main (){
  try {
    await sequelize.sync({ force: true });
    console.log('Conexão com banco de dados feita com sucesso');
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados', error);
  }
}
main()