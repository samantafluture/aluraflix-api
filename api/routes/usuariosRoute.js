const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router
  .get('/usuarios', UsuarioController.pegaTodosOsUsuarios)
  .get('/usuarios/:id', UsuarioController.pegaUsuarioPeloId)
  // .get('/usuarios/email/:email', UsuarioController.buscaUsuarioPorEmail)
  .post('/usuarios', UsuarioController.criaUsuario)
  .put('/usuarios/:id', UsuarioController.atualizaUsuario)
  .delete('/usuarios/:id', UsuarioController.removeUsuario);

module.exports = router;
