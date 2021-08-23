const bcrypt = require('bcrypt');
const models = require('../../api/models');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Usuários', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve criar uma senha hash válida para o usuário', async () => {
        const usuario = await factory.create('Usuarios', {
            senha: '12345678'
        });
        const compareHash = await bcrypt.compare('12345678', usuario.senha);

        expect(compareHash).toBe(true);
    });
    it('deve verificar se o usuário existe via email', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'ana@email.com'
        });
        const emailExistente = await models.Usuarios.findOne({
            where: { email: 'ana@email.com' }
        });

        expect(usuario.email).toMatch(emailExistente.email);
    });
    it('deve validar que o email preenchido é válido', async () => {
        const usuario = await factory.create('Usuarios', {});

        expect(usuario.email).toContain('@');
    });
    it('deve validar que nome foi preenchido e tem pelo menos 3 caracteres', async () => {
        const usuario = await factory.create('Usuarios', {
            nome: 'Zoe'
        });

        expect(usuario.nome).toHaveLength(3);
    });
});
