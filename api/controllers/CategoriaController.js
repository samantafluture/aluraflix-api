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
}

module.exports = CategoriaController;
