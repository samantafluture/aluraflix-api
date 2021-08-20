/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const routes = require('./routes');

const app = express();
const port = 3000;

routes(app);

app.use(passport.initialize());

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
