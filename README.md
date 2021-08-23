# API Rest com Node.js, Express, Sequelize e MySQL

## API no ar

Acesse: [Aluraflix API](https://aluraflix-api-samfluture.herokuapp.com/)

### Rotas livres de autenticação

- [/videos/free](https://aluraflix-api-samfluture.herokuapp.com/videos/free)
- [/categorias/free](https://aluraflix-api-samfluture.herokuapp.com/categorias/free)

![json](https://github.com/samantafluture/aluraflix-api/blob/main/public/json.png?raw=true)

## Rotas autenticadas:

Acesse a rota `/api-docs/`.

Para se autenticar, crie um usuário (`/usuarios` com método `POST`) e depois faça um login (`/login` com método `POST`).

Um token será gerado e enviado via header da requisição. Copie e cole este token na autenticação padrão do Swagger para acessar todas as rotas.

### Documentação da API:

Acesse: [Aluraflix API Documentação](https://aluraflix-api-samfluture.herokuapp.com/api-docs/)

![swagger](https://github.com/samantafluture/aluraflix-api/blob/main/public/swagger.png?raw=true)

## Tecnologias

- Node.js
- NPM
- Express
- Sequelize
- MySQL 
- Redis
- Passport/JWT
- Postman/Insomnia
- Jest/Supertest
- Swagger UI
- Heroku

## Como usar

### Instalar pacotes e dependências

1. Iniciar projeto com npm: `npm init -y`
2. Instalar express: `npm install express`
3. Criar arquivo .gitignore com `node_modules` dentro
4. Instalar a biblioteca body-parser: `npm install body-parser`
5. Instalar biblioteca nodemon como dependência de desenvolvimento: `npm install --save-dev nodemon`
6. Adicionar no package.json um script para chamar o nodemon de forma automática: `"start": "nodemon ./api/index.js"`

### Conectar com express

1. Criar pasta com arquivo dentro: api/index.js
2. Criar uma rota de conexão teste

```javascript
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.get("/teste", (req, res) => res.status(200).send({ mensagem: "teste api" }));
app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
module.exports = app;
```
3. Rodar `npm start` no terminal para colocar a app no ar

### Instalar banco de dados e ORM

1. Instalar o banco de dados MySQL: `npm install mysql2`
2. Instalar o Sequelize com duas dependências (linha de comando do ORM e path): `npm install sequelize sequelize-cli path`
3. Inicializar a linha de comando do Sequelize com `npx sequelize-cli init` para rodar as dependências que serão instaladas localmente pelo ORM
4. Passar todas as pastas criadas pelo Sequelize (/config, /migrations, /modelos e /seeders) para dentro da pasta principal que criamos anteriomente /api

```bash
├── api
│   ├── config
│   │   ├── config.json
│   ├── migrations
│   ├── models
│   │   ├── index.js
│   ├── seeders
│   ├── index.js
├── package-lock.json
├── package.json
└── .gitignore
```

5. Criar aquivo .sequelizerc na raiz do projeto, para configurar caminhos e estruturas corretas da app

```javascript
const path = require("path");
module.exports = {
    "config": path.resolve("./api/config", "config.json"),
    "models-path": path.resolve("./api/models"),
    "seeders-path": path.resolve("./api/seeders"),
    "migrations-path": path.resolve("./api/migrations")
}
```

### Conectar com banco de dados

1. No terminal, se conectar com o banco MySQL com seu usuário (aqui será root e depois sua senha): `sudo mysql -u root -p`
2. Criar a database do projeto: `create database aluraflix;`
3. Visualizar se a database foi criada: `show databases;`
4. Conectar a database com o projeto alterando o arquivo config.json, incluindo seu `username`, `password` e `database` usados na área de `development`

## Modelos

|    | Categorias |        |
|----|------------|--------|
| PK | ID         | int    |
|    | titulo     | string |
|    | cor        | string |

|    | Videos       |        |
|----|--------------|--------|
| PK | ID           | int    |
|    | titulo       | string |
|    | descricao    | string |
|    | url          | string |
| FK | categoria_id | ID     |

## Validações

- Todos os campos são obrigatórios e precisam ser preenchidos

## Em construção

- [x] Testes unitários para modelos e controllers
- [x] Testes de integração
- [x] Documentação
- [x] Deploy
- [ ] Integração com Front-end

