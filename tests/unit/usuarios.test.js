const bcrypt = require('bcrypt');
const { Usuarios } = require('../../api/models');

describe('Usuários', () => {
    it('deve criar uma senha hash válida para o usuário', async () => {
        const usuario = await Usuarios.create({
            nome: 'Rosa Fluture',
            email: 'rosa@email.com',
            senha: '12345678'
        });
        const compareHash = await bcrypt.compare('12345678', usuario.senha);
        expect(compareHash).toBe(true);
    });
    it('deve verificar se o usuário existe via email', async () => {
        const usuario = await Usuarios.findOne({
            where: { email: 'ana@email.com' }
        });
        expect(usuario.email).toMatch('ana@email.com');
    });
    it('deve validar que o email preenchido é válido', async () => {
        const usuario = await Usuarios.create({
            nome: 'Nancy Fluture',
            email: 'nancy@email.com',
            senha: '12345678'
        });
        expect(usuario.email).toContain('@');
    });
    it('deve validar que nome foi preenchido e tem pelo menos 3 caracteres', async () => {
        const usuario = await Usuarios.create({
            nome: 'Zoe',
            email: 'zozo@email.com',
            senha: '12345678'
        });
        expect(usuario.nome).toHaveLength(3);
    });
});
