const express = require('express');

const categorias = require('./categoriasRoute');
const videos = require('./videosRoute');
const usuarios = require('./usuariosRoute');

module.exports = (app) => {
    app.use(express.json(), categorias, videos, usuarios);
};
