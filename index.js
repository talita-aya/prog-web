const app = require('./app')
const sequelize = require('./helpers/bd')
const database = require('./helpers/bd')

// testar conexão com base de dados -> documentação sequelize
async function main (){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(3000, () => {
      console.log("Running on port 3000")
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
main()