const bodyParser = require("body-parser");

const categorias = require("./categoriasRoute");
const videos = require("./videosRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), categorias, videos);
};

// app.use(express.json())
