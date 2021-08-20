const { Router } = require('express');
const { autenticaUsuario } = require('../middlewares');
const UsuarioController = require('../controllers/UsuarioController');
const AuthController = require('../controllers/AuthController');

const router = Router();

router
    .get(
        '/usuarios',
        autenticaUsuario.bearer,
        UsuarioController.pegaTodosOsUsuarios,
    )
    .get(
        '/usuarios/:id',
        autenticaUsuario.bearer,
        UsuarioController.pegaUsuarioPeloId,
    )
    .post('/usuarios', UsuarioController.criaUsuario)
    .post(
        '/login',
        autenticaUsuario.local,
        AuthController.logaUsuario,
    )
    .put(
        '/usuarios/:id',
        autenticaUsuario.bearer,
        UsuarioController.atualizaUsuario,
    )
    .delete(
        '/usuarios/:id',
        autenticaUsuario.bearer,
        UsuarioController.removeUsuario,
    );

module.exports = router;
