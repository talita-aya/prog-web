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
  postOthersAdmin,
  isAdmin
} = require("../controllers/user_controller");

const router = express.Router();

//CRUD user
router.get("/", postUserAdmin); //criar o primeiro admin automaticamente
router.get("/users", getUser); //listar todos os usuários
router.get("/users/:id", checkLogin, getUserID); //listar usuário pelo ID (rota protegida, precisa do token)

router.post("/users", checkLogin, postUser); //criar user (rota protegida, precisa do token)
router.post("/users/admin", checkLogin, isAdmin, postOthersAdmin); //criar outros admin (rota protegida, precisa do token e precisa ser admin)

router.put("/users/:id", checkLogin, editUser); //editar infos do user (rota protegida, precisa do token e precisa ser admin)

router.delete("/users/:id", checkLogin, deleteUser); //deletar um  user (rota protegida, precisa do token e precisa ser admin, não pode excluir outro admin)


//login
router.post("/login", login); //login (gera o token utilizado nas outras funções)

module.exports = router;
