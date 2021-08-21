require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../../api/models');
const { Usuarios } = require('../../api/models');

describe('Usuarios', () => {
    it('deve criar uma senha hash válida para o usuário', async () => {
        const usuario = await Usuarios.create({
            nome: 'Teste 1',
            email: 'teste@email.com',
            senha: '12345678'
        });
        const compareHash = await bcrypt.compare('12345678', usuario.senha);
        expect(compareHash).toBe(true);
    });
    it('deve verificar se o usuário existe via email', async () => {
        const usuario = await models.Usuarios.findOne({
            where: { email: 'teste@email.com' }
        });
        const emailUsuario = usuario.email;
        expect(emailUsuario).toMatch('teste@email.com');
    });
    it('deve validar que o email preenchido é válido', async () => {
        const usuario = await Usuarios.create({
            nome: 'Teste 2',
            email: 'teste2@email.com',
            senha: '12345678'
        });
        const emailUsuario = usuario.email;
        expect(emailUsuario).toContain('@');
    });
    it('deve validar que nome foi preenchido e tem pelo menos 3 caracteres', async () => {
        const usuario = await Usuarios.create({
            nome: 'Sam',
            email: 'sam@email.com',
            senha: '12345678'
        });
        const nomeUsuario = usuario.nome;
        expect(nomeUsuario).toHaveLength(3);
    });
    it('deve criar um token para o usuário', async () => {
        const usuario = await Usuarios.create({
            nome: 'Teste 3',
            email: 'teste3@email.com',
            senha: '12345678'
        });
        const payload = { id: usuario.id };
        const token = jwt.sign(payload, process.env.JWT_TOKEN);
        expect(token).toBeDefined();
    });
});
