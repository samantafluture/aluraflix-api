const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Services = require('../services/Services');

const usuariosServices = new Services('Usuarios');

// eslint-disable-next-line no-unused-vars
async function buscaUsuarioPorEmail(req, res) {
  const { email } = req.params;
  const usuario = await usuariosServices.pegaUmRegistro({ email });
  if (!usuario) {
    return null;
  }
  return usuario;
}

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new Error('Não existe usuário com este email');
  }
}

passport.use(
  // objeto de configuração da estratégia local
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    (email, senha, done) => {
      // função de verificação
      try {
        const usuario = buscaUsuarioPorEmail(email);
        verificaUsuario(usuario);
      } catch (erro) {
        done(erro);
      }
    },
  ),
);
