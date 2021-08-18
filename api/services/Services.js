const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo].findAll({
      where: { ...where },
      ...agregadores,
    });
  }

  async pegaUmRegistro(where = {}) {
    return database[this.nomeDoModelo].findOne({ where: { ...where } });
  }

  async criaRegistro(dados) {
    return database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      { where: { id: id } },
      transacao
    );
  }

  async apagaRegistro(id) {
    return database[this.nomeDoModelo].destroy({ where: { id: id } });
  }

  async encontraEContaRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo].findAndCountAll({
      where: { ...where },
      ...agregadores,
    });
  }
}

module.exports = Services;
