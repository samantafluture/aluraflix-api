const express = require('express');
const routes = require('./routes');
require('./redis/blacklist');

const app = express();
routes(app);

module.exports = app;
