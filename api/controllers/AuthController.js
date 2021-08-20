require('dotenv').config();

const jwt = require('jsonwebtoken');

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '15m',
    });
    return token;
}

class AuthController {
    static logaUsuario(req, res) {
        const token = criaTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }
}

module.exports = AuthController;
