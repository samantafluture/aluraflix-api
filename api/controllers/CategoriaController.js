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

  static async pegaUmaCategoria(req, res) {
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
}

module.exports = CategoriaController;
