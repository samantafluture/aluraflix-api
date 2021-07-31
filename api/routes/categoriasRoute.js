const { Router } = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const router = Router();

router
  .get("/categorias", CategoriaController.pegaTodasAsCategorias)
  .get("/categorias/:id", CategoriaController.pegaUmaCategoria);

module.exports = router;
