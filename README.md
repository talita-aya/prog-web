# Projeto Web Back-End 
Este projeto foi desenvolvido como avaliação para a disciplina de Programação Web, visando permitir a aplicação de conceitos e temas abordados em aula em um exemplo prático.

 1. [Inicialização](#inicialização)
 2. [Rotas](#rotas)
 3. [Tecnologias e pacotes utilizados](#tecnologias-e-pacotes-utilizados)
 4. [Requisitos](#requisitos)

<br/>

## 📥 Inicialização

1. Clonar o código para seu próprio computador
  ```
  git clone [link do repositório]
  ```
 
2. Dentro da pasta do projeto, instalar todas as dependências
  ```
  npm i
  //npm install
  ```
	
3. Criar um documento *.env* para armazenar variáveis
  ```
  DB_DIALECT=postgres
  DB_HOST=localhost
    DB_NAME=[name here]
    DB_PORT=[port here]
    DB_USER=[user here]
    DB_PASSWORD=[password here]
    JWT_KEY="[key here]"
  ```

4. Inicializar o projeto
	```
  npm start
  ```

<br/>

## 🗺️ Rotas

1. Criar a tabela no banco de dados, o primeiro administrador e 5 usuários comuns
  ``` 
  GET /install
  ```

2. Listar todos os usuários cadastrados (rota protegida, necessário inserir o token e somente para administradores)
  ```
  GET /users
  ```

3. Listar usuário pelo ID (rota protegida, necessário inserir o token e somente para administradores)
  ```
  GET /users/:id
  ```

4. Listar usuários, sendo visível somente nome, idade e e-mail cadastrado (rota protegida, necessário inserir o token)
  ```
  GET /nome-idade
  ```

5. Criar usuário comum (rota protegida, necessário inserir o token)
  ```
  POST /users
  ```

6. Criar administradores (rota protegida, necessário inserir o token e somente para administradores)
  ```
  POST /users/admin
  ```

7. Login 
  ```
  POST /login
  ```

8. Atualizar idade (rota protegida, necessário inserir o token e somente para administradores)
  ```
  POST /users/age
  ```

9. Editar informações do usuário (rota protegida, necessário inserir o token e somente para administradores)
  ```
  PUT /users/:id
  ```
	> **id** é o identificador do usuário que se deseja editar os dados

10. Editar próprias informações (rota protegida, necessário inserir o token e não é possível um usuário comum alterar informações de outro usuário)
  ```
  PUT /users/edit/:username
  ```
	> **username** é o usuário que se deseja editar os dados

11. Deletar um usuário comum (rota protegida, necessário inserir o token, somente para administradores e não é possível excluir administradores)
  ```
  DELETE /users/:id
  ```

<br/>

## 💻 Tecnologias e pacotes utilizados
Para o desenvolvimento de algumas funcionalidades foram utilizadas tecnologias citadas durante as aulas da disciplina, sendo elas:

- [NPM](https://www.npmjs.com) para gerenciamento de pacotes;
- [Express](https://expressjs.com) como framework;
-  [PostgreSQL](https://www.postgresql.org) para o banco de dados;
- [Nodemon](https://www.npmjs.com/package/nodemon) para facilitar testes;
- [JWT](https://www.npmjs.com/package/jsonwebtoken) para autenticação;
- [Dotenv](https://www.npmjs.com/package/dotenv) para gerenciamento de variáveis;
- [Bcrypt](https://www.npmjs.com/package/bcrypt) para criptografia de senhas;

<br/>

## 📃 Requisitos
O projeto se trata da construção de uma API web back-end que atende aos seguintes requisitos:

### ➔ Usuários e sistema de autenticação
- O sistema possui uma rota que permite o cadastro de usuários, recebendo os dados pessoais e as credenciais (usuário e senha) para autenticação na API;

- O sistema possui um (ou mais) usuários administradores que possuem privilégios específicos como alterar e excluir outros usuários e criar outros administradores. A instalação do sistema cria um usuário administrador por padrão na aplicação;

- Há uma rota para que os administradores possam criar outros administradores;

- Há uma rota para que os administradores possam excluir um usuário não administrador;

- A rota de login recebe o usuário e senha, gerando um token JWT que permite acesso às rotas protegidas da API;

- Um usuário pode alterar seus dados pessoais por meio de uma rota específica. Os usuários comuns não poderão alterar dados de outros usuários, todavia os administradores podem.



### ➔ Sistema CRUD
- O sistema permite a realização de pelo menos 3 cadastros (operações de CRUD completa). Obrigatoriamente as operações de inserção, alteração e exclusão são restritas para o usuário autenticado no sistema (que possuem um token válido);

- Somente admnistradores possuem acesso as operações de listar completa e busca pelo identificador único. Usuários comuns só conseguem listar nome, idade e e-mail;

- É realizada a validação adequada dos dados fornecidos pelo usuário, gerando mensagens de erros personalizadas de acordo com o erro obtido;

- Os métodos de listar possuem a paginação dos dados, de tal forma que eles recebem 2 parâmetros: limite e página.

  

### ➔ Lógica de negócio e instalador

- Foi implementando uma lógica de negócio que envolve alteração no banco de dados e processamento dos dados, estes que são recebidos por parâmetros ou do próprio banco de dados;

- Foi criado uma rota GET /install que realiza a instalação do banco de dados (criação das tabelas e inserção de dados no banco), em que cada tabela foi populada com 5 registros.