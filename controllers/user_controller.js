const userModel = require('../models/user_model')

const getUser = async (req, res) => {
  try {
    const userList = await userModel.findAll()
    console.log(userList)
    res.send('Lista de usuários gerada')
  } catch(error) {
    return res.status(500).json({mensagem: error.message})
  }
}

const getUserID = async (req, res) => {
  try {
    const {id} = req.params
    const userID = await userModel.findOne({
      where: {
        id
      }
    })

    if(!userID) {
      return res.status(404).json({mensagem: "Este usuário não existe"})
    }

    res.status(200).json(userID)
  } catch(error) {
    return res.status(500).json({mensagem: error.message})
  }
}

const postUser = async(req, res) => {
  const {name, age, email, username, password } = req.body

  try {
    const newUser = await userModel.create({
      name: name,
      age: age,
      email: email,
      username: username,
      password: password
    })
  
    console.log(newUser)
    res.send('Usuário criado')
  } catch (error) {
    return res.status(500).json({mensagem: error.message})
  }
}

const editUser = async (req, res) => {
  try {
    const {id} = req.params
    const {name, age, email, username, password} = req.body
  
    const putUser = await userModel.findByPk(id)
    putUser.name = name
    putUser.age = age
    putUser.email = email
    putUser.username = username
    putUser.password = password
  
    await putUser.save() //salvando no bd
  
    res.status(200).json({mensagem: putUser})
  } catch (error) {
    return res.status(500).json({mensagem: error.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params
    await userModel.destroy({
      where: {
        id
      }
    })
  
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({mensagem: error.message})
  }
}

module.exports = {getUser, getUserID, postUser, editUser, deleteUser }