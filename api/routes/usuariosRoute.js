const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();

router
  .get("/usuarios", UsuarioController.pegaTodosOsUsuarios)
  .get("/usuarios/:id", UsuarioController.pegaUsuarioPeloId)
  .post("/usuarios", UsuarioController.criaUsuario)
  .put("/usuarios/:id", UsuarioController.atualizaUsuario)
  .delete("/usuarios/:id", UsuarioController.removeUsuario);

module.exports = router;
