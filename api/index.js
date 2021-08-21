require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

require('./redis/blacklist');

routes(app);

app.listen(port, () => console.log(`API rodando na porta ${port}`));

module.exports = app;
