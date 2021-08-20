const { Router } = require('express');
const { middlewaresAutenticacao } = require('../middlewares');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router
    .get(
        '/usuarios',
        middlewaresAutenticacao.bearer,
        UsuarioController.pegaTodosOsUsuarios,
    )
    .get(
        '/usuarios/:id',
        middlewaresAutenticacao.bearer,
        UsuarioController.pegaUsuarioPeloId,
    )
    .post('/usuarios', UsuarioController.criaUsuario)
    .post(
        '/login',
        middlewaresAutenticacao.local,
        UsuarioController.logaUsuario,
    )
    .put(
        '/usuarios/:id',
        middlewaresAutenticacao.bearer,
        UsuarioController.atualizaUsuario,
    )
    .delete(
        '/usuarios/:id',
        middlewaresAutenticacao.bearer,
        UsuarioController.removeUsuario,
    );

module.exports = router;
