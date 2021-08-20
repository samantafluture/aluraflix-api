const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define(
    'Usuarios',
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
      hooks: {
        beforeCreate: (usuario) => {
          const salt = bcrypt.genSaltSync();
          // eslint-disable-next-line no-param-reassign
          usuario.senha = bcrypt.hashSync(usuario.senha, salt);
        },
      },
      classMethods: {
        // eslint-disable-next-line no-unused-vars
        associate: (models) => {},
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
      },
    },
  );
  return Usuarios;
};
