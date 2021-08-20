const jwt = require('jwt-simple');
const { Router } = require('express');
const Usuarios = require('../models/usuarios');
const { jwtSecret } = require('../config/config');

module.exports = () => {
  const router = Router();

  router.post('/token', (req, res) => {
    if (req.body.email && req.body.senha) {
      const { email, senha } = req.body;
      Usuarios.findOne({ where: { email } })
        .then((usuario) => {
          if (Usuarios.isPassword(usuario.senha, senha)) {
            const payload = { id: usuario.id };
            res.json({
              token: jwt.encode(payload, jwtSecret),
            });
          } else {
            res.sendStatus(401);
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
