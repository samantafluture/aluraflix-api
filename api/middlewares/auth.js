const passport = require('passport');
const { Strategy } = require('passport');
const Usuarios = require('../models/usuarios');
const { jwtSecret, jwtSession } = require('../config/config');

module.exports = () => {
  const strategy = new Strategy(
    { secretOrKey: jwtSecret },
    (payload, done) => {
      Usuarios.findById(payload.id)
        .then((usuario) => {
          if (usuario) {
            return done(null, {
              id: usuario.id,
              email: usuario.email,
            });
          }
          return done(null, false);
        })
        .catch((error) => done(error, null));
    },
  );

  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', jwtSession),
  };
};
