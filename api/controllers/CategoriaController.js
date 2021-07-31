const Services = require("../services/Services");
const categoriasServices = new Services("Categorias");

class CategoriaController {
  static async pegaTodasAsCategorias(req, res) {
    try {
      const todasAsCategorias = await categoriasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsCategorias);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaCategoriaPeloId(req, res) {
    const { id } = req.params;
    try {
      const categoria = await categoriasServices.pegaUmRegistro({ id });
      if (categoria === null) {
        return res.status(200).json({ mensagem: `categoria ${id} não existe` });
      } else {
        return res.status(200).json(categoria);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaCategoria(req, res) {
    const novaCategoria = req.body;
    try {
      const novaCategoriaCriada = await categoriasServices.criaRegistro(
        novaCategoria
      );
      return res.status(200).json(novaCategoriaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaCategoria(req, res) {
    const { id } = req.params;
    const infosAtualizadas = req.body;
    try {
      await categoriasServices.atualizaRegistro(infosAtualizadas, id);
      return res.status(200).json({ mensagem: `categoria ${id} atualizada` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removeCategoria(req, res) {
    const { id } = req.params;
    try {
      await categoriasServices.apagaRegistro(id);
      return res.status(200).json({ mensagem: `categoria ${id} removida` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = CategoriaController;
