const userModel = require("../models/user_model");
const jwt = require('jsonwebtoken')
require('dotenv').config()

// -------------------------------------------------------------------------------------------------------
// listar todos os usuários
const getUser = async (req, res) => {
  try {
    const userList = await userModel.findAll();
    res.status(200).json(userList);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};


// -------------------------------------------------------------------------------------------------------
// listar usuário pelo ID (rota protegida, precisa do token)
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


// -------------------------------------------------------------------------------------------------------
// criar user (rota protegida, precisa do token)
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


// -------------------------------------------------------------------------------------------------------
// criar o primeiro admin automaticamente
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


// -------------------------------------------------------------------------------------------------------
// criar outros admin (rota protegida, precisa do token e precisa ser admin)
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


// -------------------------------------------------------------------------------------------------------
// editar infos do user (rota protegida, precisa do token e precisa ser admin)
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


// -------------------------------------------------------------------------------------------------------
// deletar um  user (rota protegida, precisa do token e precisa ser admin, não pode excluir outro admin)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await userModel.findOne({
      where: {
        id,
        role: "user"
      },
    });

    if (!existingUser) {
      return res.status(404).json({ mensagem: "Erro ao excluir, user não existe ou é admin" });
    }

    await userModel.destroy({
      where: {
        id,
        role: "user"
      },
    });

    res.status(200).json({ mensagem: "User deletado com sucesso! ID: " + id });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};


// -------------------------------------------------------------------------------------------------------
// login (gera o token utilizado nas outras funções)
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
    }, process.env.JWT_KEY, {expiresIn: "190h"})

    res.status(200).json({
      message: "Login realizado com sucesso",
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}


// -------------------------------------------------------------------------------------------------------
// checar se é admnistrador para que algumas ações sejam permitidas
const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: "Nenhum token informado" });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    const userLogado = await userModel.findOne({
      where: { username: decoded.username }
    });


    if (userLogado.role !== "admin") {
      return res.status(403).json({ mensagem: "Acesso negado, você não é um admin" });
    }

    next();
  });
};



module.exports = {
  getUser,
  getUserID,
  postUser,
  editUser,
  deleteUser,
  postUserAdmin,
  login,
  postOthersAdmin,
  isAdmin
};
