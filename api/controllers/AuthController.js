require('dotenv').config();

const jwt = require('jsonwebtoken');
const blacklist = require('../database/redis/manipulaBlacklist');

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '15m'
    });
    return token;
}

class AuthController {
    static logaUsuario(req, res) {
        const token = criaTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(200).send({ token });
    }

    static async logoutUsuario(req, res) {
        try {
            // eslint-disable-next-line prefer-destructuring
            const token = req.token;
            await blacklist.adiciona(token);
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = AuthController;
