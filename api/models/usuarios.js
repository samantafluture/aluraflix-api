const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class Usuarios extends Model {
        static associate(models) {}
    }
    Usuarios.init(
        {
            nome: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'O campo \'nome\' é obrigatório'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Preencha com email válido'
                    }
                }
            },
            senha: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [2, 100],
                        msg: 'O campo \'senha\' é obrigatório e deve ter de 2 a 100 caracteres'
                    }
                }
            }
        },
        {
            sequelize,
            modelName: 'Usuarios'
        }
    );
    Usuarios.addHook('beforeCreate', async (usuario) => {
        const senhaHash = await bcrypt.hash(usuario.senha, 8);
        // eslint-disable-next-line no-param-reassign
        usuario.senha = senhaHash;
    });
    return Usuarios;
};
