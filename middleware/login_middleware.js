const jwt = require('jsonwebtoken')
require('dotenv').config()

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

module.exports = loginMiddleware


