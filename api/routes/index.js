const express = require('express');

const categorias = require('./categoriasRoute');
const videos = require('./videosRoute');
const usuarios = require('./usuariosRoute');
const auth = require('./authRoute');

module.exports = (app) => {
    app.use(express.json(), categorias, videos, usuarios, auth);
};
