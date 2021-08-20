require('dotenv').config();

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

const {
    validaUsuario,
    a,
} = require('./middlewares');

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
