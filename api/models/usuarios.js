"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "O campo 'nome' é obrigatório",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Preencha com email válido",
          },
        },
      },
      senha: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 10],
            msg: "O campo 'senha' é obrigatório e deve ter de 2 a 10 caracteres",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Usuarios",
    }
  );
  return Usuarios;
};
