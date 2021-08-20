const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const router = Router();

router
  .get('/categorias', CategoriaController.pegaTodasAsCategorias)
  .get('/categorias/:id', CategoriaController.pegaCategoriaPeloId)
  .post('/categorias', CategoriaController.criaCategoria)
  .put('/categorias/:id', CategoriaController.atualizaCategoria)
  .delete('/categorias/:id', CategoriaController.removeCategoria);

module.exports = router;
