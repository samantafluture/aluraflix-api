const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {}
  }
  Usuarios.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'O campo \'nome\' é obrigatório',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Preencha com email válido',
          },
        },
      },
      senha: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 10],
            msg: 'O campo \'senha\' é obrigatório e deve ter de 2 a 10 caracteres',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Usuarios',
    },
  );
  Usuarios.addHook('beforeSave', async (usuario) => {
    if (usuario.senha) {
      // eslint-disable-next-line no-param-reassign
      usuario.senha = await bcrypt.hash(usuario.senha, 8);
    }
  });
  return Usuarios;
};
