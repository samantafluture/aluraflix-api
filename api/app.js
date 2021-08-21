require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const routes = require('./routes');
require('./redis/blacklist');

const app = express();
routes(app);

module.exports = app;
