const express = require("express")
const app = require('./app')
const sequelize = require('./helpers/bd')


//documentação sequelize
async function main (){
  try {
    await sequelize.sync();
    app.listen(3000)
    console.log('Conexão com banco de dados feita com sucesso');
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados', error);
  }
}
main()