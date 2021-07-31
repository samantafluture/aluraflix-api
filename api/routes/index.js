const bodyParser = require("body-parser");

const categorias = require("./categoriasRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), categorias);
};
