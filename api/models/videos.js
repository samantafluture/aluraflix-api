"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      Videos.belongsTo(models.Categorias, {
        foreignKey: "categoria_id"
      });
    }
  }
  Videos.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Videos",
    }
  );
  return Videos;
};
