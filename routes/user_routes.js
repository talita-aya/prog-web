const express = require("express")
const checkLogin = require('../middleware/login_middleware')

var {
  getUser,
  getUserID,
  postUser,
  editUser,
  deleteUser,
  postUserAdmin,
  login
} = require("../controllers/user_controller");

const router = express.Router();

//CRUD user
router.get("/", postUserAdmin);
router.get("/users", getUser);
router.get("/users/:id", getUserID);
router.post("/users", postUser);
router.put("/users/:id", checkLogin, editUser);
router.delete("/users/:id", deleteUser);

//login
router.post("/login", login);

module.exports = router;
