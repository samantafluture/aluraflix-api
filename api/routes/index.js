const bodyParser = require("body-parser");

const categorias = require("./categoriasRoute");
const videos = require("./videosRoute");
const usuarios = require("./usuariosRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), categorias, videos, usuarios);
};

// app.use(express.json())
