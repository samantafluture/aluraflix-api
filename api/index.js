require('dotenv').config();

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

require('./redis/blacklist');

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
