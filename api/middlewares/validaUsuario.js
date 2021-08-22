require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const blacklist = require('../database/redis/manipulaBlacklist');
const { InvalidArgumentError } = require('../helpers/manipulaErros');

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com este email');
    }
}

async function verificaTokenNaBlacklist(token) {
    const tokenNaBlacklist = await blacklist.contemToken(token);
    if (tokenNaBlacklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout');
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos');
    }
}

passport.use(
    // objeto de configuração da estratégia local
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async (email, senha, done) => {
            // função de verificação
            try {
                const usuario = await models.Usuarios.findOne({
                    where: { email }
                });
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (erro) {
                done(erro);
            }
        }
    )
);

passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            // verifica se o token está na blacklist
            await verificaTokenNaBlacklist(token);
            // devolve payload se o token estiver váliado
            const payload = jwt.verify(token, process.env.JWT_TOKEN);
            // recupera o usuário via id
            const usuario = await models.Usuarios.findOne({
                where: { id: payload.id }
            });
            // eslint-disable-next-line object-shorthand
            done(null, usuario, { token: token });
        } catch (erro) {
            done(erro);
        }
    })
);
