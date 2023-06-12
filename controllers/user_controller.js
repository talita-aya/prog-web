const userModel = require("../models/user_model");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUser = async (req, res) => {
  try {
    const userList = await userModel.findAll();
    res.status(200).json(userList);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const getUserID = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = await userModel.findOne({
      where: {
        id,
      },
    });

    if (!userID) {
      return res.status(404).json({ mensagem: "Este usuário não existe" });
    }

    res.status(200).json(userID);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const postUser = async (req, res) => {
  const { name, age, email, username, password, role } = req.body;

  try {
    const existingUser = await userModel.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" });
    }

    const newUser = await userModel.create({
      name: name,
      age: age,
      email: email,
      username: username,
      password: password,
      role: "user",
    });

    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const postUserAdmin = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({
      where: {
        username: "admin1",
      },
    });

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" });
    }

    const newUser = await userModel.create({
      name: "admin",
      age: "0",
      email: "admin@gmail.com",
      username: "admin1",
      password: "admin1",
      role: "admin"
    });
    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const postOthersAdmin = async (req, res) => {
  const { name, age, email, username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(404).json({ mensagem: "Username já cadastrado" });
    }

    const newUser = await userModel.create({
      name: name,
      age: age,
      email: email,
      username: username,
      password: password,
      role: "admin",
    });

    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, username, password } = req.body;

    const putUser = await userModel.findByPk(id);
    putUser.name = name;
    putUser.age = age;
    putUser.email = email;
    putUser.username = username;
    putUser.password = password;
    putUser.role = role

    await putUser.save(); //salvando no bd

    res.status(200).json({ mensagem: putUser });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await userModel.findOne({
      where: {
        id,
      },
    });

    const userAdmin = await userModel.findOne({
      where: {
        role: "user"
      },
    });

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Usuário não cadastrado" });
    }

    if (!userAdmin) {
      return res.status(404).json({ mensagem: "Usuário admin" });
    }

    await userModel.destroy({
      where: {
        id
      },
    });

    res.status(200).json({ mensagem: "User deletado com sucesso! ID: " + id });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      where: {
        username,
        password
      },
    });

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Erro ao tentar fazer login" });
    }

    const token = jwt.sign({
      username: username,
      password: password
    }, process.env.JWT_KEY, {expiresIn: "1h"})

    res.status(200).json({
      message: "Login realizado com sucesso",
      token: token
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  getUser,
  getUserID,
  postUser,
  editUser,
  deleteUser,
  postUserAdmin,
  login,
  postOthersAdmin
};
