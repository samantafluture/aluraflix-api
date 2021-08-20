const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    static associate(models) {
      Categorias.hasMany(models.Videos, {
        foreignKey: 'categoria_id',
      });
    }
  }
  Categorias.init(
    {
      titulo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'O campo \'titulo\' é obrigatório',
          },
        },
      },
      cor: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: ['^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'],
            msg: 'O campo \'cor\' é obrigatório e deve ser em código hexadecimal',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Categorias',
    },
  );
  return Categorias;
};
