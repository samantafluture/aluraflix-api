require('dotenv').config();

const jwt = require('jsonwebtoken');
const Services = require('../services/Services');

const usuariosServices = new Services('Usuarios');

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN);
    return token;
}

class UsuarioController {
    static async pegaTodosOsUsuarios(req, res) {
        try {
            const todosOsUsuarios = await usuariosServices.pegaTodosOsRegistros();
            return res.status(200).json(todosOsUsuarios);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUsuarioPeloId(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuariosServices.pegaUmRegistro({ id });
            if (usuario === null) {
                return res
                    .status(400)
                    .json({ mensagem: `usuário ${id} não existe` });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaUsuario(req, res) {
        const novoUsuario = req.body;

        try {
            const novoUsuarioCriado = await usuariosServices.criaRegistro(
                novoUsuario,
            );
            return res.status(200).json(novoUsuarioCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaUsuario(req, res) {
        const { id } = req.params;
        const infosAtualizadas = req.body;
        try {
            await usuariosServices.atualizaRegistro(infosAtualizadas, id);
            return res
                .status(200)
                .json({ mensagem: `usuário ${id} atualizado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async removeUsuario(req, res) {
        const { id } = req.params;
        try {
            await usuariosServices.apagaRegistro(id);
            return res.status(200).json({ mensagem: `usuário ${id} removido` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static logaUsuario(req, res) {
        const token = criaTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }
}

module.exports = UsuarioController;
