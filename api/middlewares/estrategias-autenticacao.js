const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models');

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new Error('Não existe usuário com este email');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new Error('Email ou senha inválidos');
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
        async (email, senha, done) => {
            // função de verificação
            try {
                const usuario = await models.Usuarios.findOne({ where: { email } });
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (erro) {
                done(erro);
            }
        },
    ),
);
