const { Router } = require('express');
const { autenticaUsuario } = require('../middlewares');
const { AuthController } = require('../controllers');

const router = Router();

router
    .get('/logout', autenticaUsuario.bearer, AuthController.logoutUsuario)
    .post('/login', autenticaUsuario.local, AuthController.logaUsuario);

module.exports = router;
