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
  isAdmin,
  editMe,
  post5Users,
  updateAge,
  getNameAge
} = require("../controllers/user_controller");

const router = express.Router();

//CRUD user
router.get("/install", post5Users, postUserAdmin, ); //criar o primeiro admin automaticamente + 5 usuários
router.get("/users", checkLogin, isAdmin, getUser); //listar todos os usuários (rota protegida, precisa do token e precisa ser admin)
router.get("/users/:id", checkLogin, isAdmin, getUserID); //listar usuário pelo ID (rota protegida, precisa do token e precisa ser admin)
router.get("/nome-idade", checkLogin, getNameAge); //listar usuário e idade (rota protegida, precisa do token)

router.post("/users", checkLogin, postUser); //criar user (rota protegida, precisa do token)
router.post("/users/admin", checkLogin, isAdmin, postOthersAdmin); //criar outros admin (rota protegida, precisa do token e precisa ser admin)
router.post("/users/age", checkLogin, isAdmin, updateAge); //atualizar idade (rota protegida, precisa do token e precisa ser admin)

router.put("/users/:id", checkLogin, isAdmin, editUser); //editar infos do user (rota protegida, precisa do token e precisa ser admin)
router.put("/users/edit/:username", checkLogin, editMe); //editar infos do próprio user (rota protegida, precisa do token e não pode alterar infos de outra pessoa)
//username: quem quero alterar

router.delete("/users/:id", checkLogin, isAdmin, deleteUser); //deletar um  user (rota protegida, precisa do token e precisa ser admin, não pode excluir outro admin)

//login
router.post("/login", login); //login (gera o token utilizado nas outras funções)

module.exports = router;
