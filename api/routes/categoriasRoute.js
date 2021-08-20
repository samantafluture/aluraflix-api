const { Router } = require('express');
const { middlewaresAutenticacao } = require('../middlewares');
const CategoriaController = require('../controllers/CategoriaController');

const router = Router();

router
    .get(
        '/categorias',
        middlewaresAutenticacao.bearer,
        CategoriaController.pegaTodasAsCategorias,
    )
    .get(
        '/categorias/:id',
        middlewaresAutenticacao.bearer,
        CategoriaController.pegaCategoriaPeloId,
    )
    .post(
        '/categorias',
        middlewaresAutenticacao.bearer,
        CategoriaController.criaCategoria,
    )
    .put(
        '/categorias/:id',
        middlewaresAutenticacao.bearer,
        CategoriaController.atualizaCategoria,
    )
    .delete(
        '/categorias/:id',
        middlewaresAutenticacao.bearer,
        CategoriaController.removeCategoria,
    );

module.exports = router;
