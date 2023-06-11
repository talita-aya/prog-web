const userModel = require('../models/user_model')

const getUser = async (req, res) => {
  try {
    const userList = await userModel.findAll()
    console.log(userList)
    res.send('GET user')
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
    res.send('POST user')
  } catch (error) {
    return res.status(500).json({mensagem: error.message})
  }
}

module.exports = {getUser, postUser}