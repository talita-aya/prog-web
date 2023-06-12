const express = require("express")
const checkLogin = require('../middleware/login_middleware')

var {
  getUser,
  getUserID,
  postUser,
  editUser,
  deleteUser,
  postUserAdmin,
  login,
  postOthersAdmin
} = require("../controllers/user_controller");

const router = express.Router();

//CRUD user
router.get("/", postUserAdmin); //criar admin automaticamente
router.get("/users", getUser); //lista de usuários
router.get("/users/:id", checkLogin, getUserID); //usuário do ID informado

router.post("/users", postUser); //criar usuários
router.post("/users/admin", checkLogin, postOthersAdmin); //criar mais usuários admin

router.put("/users/:id", checkLogin, editUser); //editar usuários

router.delete("/users/:id", checkLogin, deleteUser); //deletar usuários


//login
router.post("/login", login); //login

module.exports = router;
