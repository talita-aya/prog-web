const express = require("express");

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
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

//login
router.post("/login", login);

module.exports = router;
