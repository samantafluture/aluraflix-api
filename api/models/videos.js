const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Videos extends Model {
        static associate(models) {
            Videos.belongsTo(models.Categorias, {
                foreignKey: 'categoria_id',
            });
        }
    }
    Videos.init(
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
            descricao: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'O campo \'descricao\' é obrigatório',
                    },
                },
            },
            url: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: {
                        args: true,
                        msg: 'O campo \'url\' é obrigatório e deve ser uma URL válida',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Videos',
        },
    );
    return Videos;
};
