const Services = require("../services/Services");
const usuariosServices = new Services("Usuarios");

class UsuarioController {
  static async pegaTodosOsUsuarios(req, res) {
    const where = {};
    const page = req.query.page;
    const limit = 5;
    const offset = page ? parseInt(page * limit) : 0;
    const order = [["id", "ASC"]];

    try {
      const todosOsUsuarios = await usuariosServices.pegaTodosOsRegistros(
        where,
        {
          limit: limit,
          offset: offset,
          order: order,
        }
      );
      return res.status(200).json(todosOsUsuarios);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUsuarioPeloId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuariosServices.pegaUmRegistro({ id });
      if (usuario === null) {
        return res.status(400).json({ mensagem: `usuário ${id} não existe` });
      } else {
        return res.status(200).json(usuario);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaUsuario(req, res) {
    const novoUsuario = req.body;
    try {
      const novoUsuarioCriado = await usuariosServices.criaRegistro(
        novoUsuario
      );
      return res.status(200).json(novoUsuarioCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaUsuario(req, res) {
    const { id } = req.params;
    const infosAtualizadas = req.body;
    try {
      await usuariosServices.atualizaRegistro(infosAtualizadas, id);
      return res.status(200).json({ mensagem: `usuário ${id} atualizado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removeUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuariosServices.apagaRegistro(id);
      return res.status(200).json({ mensagem: `usuário ${id} removido` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;
