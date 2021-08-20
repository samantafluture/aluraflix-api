/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

const { estrategiasAutenticacao } = require('./middlewares');

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
