require('dotenv').config()
const express = require('express')
const app = express()

app.get("/api", (req, res) => {
  res.json({
    mensagem: "Funcionando"
  })
})

app.listen(3000, () => {
  console.log("Running on port 3000")
})

module.exports = app