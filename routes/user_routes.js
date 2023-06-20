const express = require("express")
const router = express.Router();

var {
  loginMiddleware,
  isAdmin,
  login
} = require('../middleware/login_middleware')

var {
  postUserAdmin,
  post5Users
} = require("../controllers/install_controller.js")

var {
  getUser,
  getUserID,
  getNameAge
} = require("../controllers/get_controllers")

var {
  postUser,
  postOthersAdmin,
  updateAge
} = require("../controllers/post_controller")

var {
  editUser,
  editMe
} = require("../controllers/put_controller")

var {
  deleteUser,
} = require("../controllers/delete_controller")

//CRUD user
router.get("/install", post5Users, postUserAdmin); //criar o primeiro admin automaticamente + 5 usuários

router.get("/users", loginMiddleware, isAdmin, getUser); //listar todos os usuários (rota protegida, precisa do token e precisa ser admin)
router.get("/users/:id", loginMiddleware, isAdmin, getUserID); //listar usuário pelo ID (rota protegida, precisa do token e precisa ser admin)
router.get("/nome-idade", loginMiddleware, getNameAge); //listar usuário e idade (rota protegida, precisa do token)

router.post("/users", loginMiddleware, postUser); //criar user (rota protegida, precisa do token)
router.post("/users/admin", loginMiddleware, isAdmin, postOthersAdmin); //criar outros admin (rota protegida, precisa do token e precisa ser admin)
router.post("/users/age", loginMiddleware, isAdmin, updateAge); //atualizar idade (rota protegida, precisa do token e precisa ser admin)

router.put("/users/:id", loginMiddleware, isAdmin, editUser); //editar infos do user (rota protegida, precisa do token e precisa ser admin)
router.put("/users/edit/:username", loginMiddleware, editMe); //editar infos do próprio user (rota protegida, precisa do token e não pode alterar infos de outra pessoa)
//username: quem quero alterar

router.delete("/users/:id", loginMiddleware, isAdmin, deleteUser); //deletar um  user (rota protegida, precisa do token e precisa ser admin, não pode excluir outro admin)

//login
router.post("/login", login); //login (gera o token utilizado nas outras funções)

module.exports = router;
