const { Router } = require('express');
const passport = require('passport');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router
    .get('/usuarios', UsuarioController.pegaTodosOsUsuarios)
    .get('/usuarios/:id', UsuarioController.pegaUsuarioPeloId)
    .post('/usuarios', UsuarioController.criaUsuario)
    .post(
        '/login',
        passport.authenticate('local', { session: false }),
        UsuarioController.logaUsuario,
    )
    .put('/usuarios/:id', UsuarioController.atualizaUsuario)
    .delete(
        '/usuarios/:id',
        passport.authenticate('bearer', { session: false }),
        UsuarioController.removeUsuario,
    );

module.exports = router;
