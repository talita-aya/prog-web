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
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = UsersModel

// module.exports = {
//   list: async function() {
//       const users = await UsersModel.findAll()
//       return users
//   },
  
//   save: async function(name) {
//       const user = await UsersModel.create({
//           name: name
//       })
      
//       return user
//   },

//   update: async function(id, name) {
//       return await UsersModel.update({name: name}, {
//           where: { id: id }
//       })
//   },

//   delete: async function(id) {
//       //Precisa fazer algo para os livros que este autor possui
//       return await UsersModel.destroy({where: { id: id }})
//   },

//   Model: UsersModel
// }