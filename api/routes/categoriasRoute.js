const { Router } = require('express');
const { autenticaUsuario } = require('../middlewares');
const CategoriaController = require('../controllers/CategoriaController');

const router = Router();

router
    .get(
        '/categorias',
        autenticaUsuario.bearer,
        CategoriaController.pegaTodasAsCategorias,
    )
    .get(
        '/categorias/:id',
        autenticaUsuario.bearer,
        CategoriaController.pegaCategoriaPeloId,
    )
    .post(
        '/categorias',
        autenticaUsuario.bearer,
        CategoriaController.criaCategoria,
    )
    .put(
        '/categorias/:id',
        autenticaUsuario.bearer,
        CategoriaController.atualizaCategoria,
    )
    .delete(
        '/categorias/:id',
        autenticaUsuario.bearer,
        CategoriaController.removeCategoria,
    );

module.exports = router;
