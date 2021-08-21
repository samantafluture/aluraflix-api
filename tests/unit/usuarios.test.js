const bcrypt = require('bcrypt');
const models = require('../../api/models');
const { Usuarios } = require('../../api/models');

describe('Usuários', () => {
    // it('deve criar uma senha hash válida para o usuário', async () => {
    //     const usuario = await Usuarios.create({
    //         nome: 'Teste 1',
    //         email: 'teste@email.com',
    //         senha: '12345678'
    //     });
    //     const compareHash = await bcrypt.compare('12345678', usuario.senha);
    //     expect(compareHash).toBe(true);
    // });
    // it('deve verificar se o usuário existe via email', async () => {
    //     const usuario = await models.Usuarios.findOne({
    //         where: { email: 'teste@email.com' }
    //     });
    //     const emailUsuario = usuario.email;
    //     expect(emailUsuario).toMatch('teste@email.com');
    // });
    it('deve validar que o email preenchido é válido', async () => {
        const usuario = await Usuarios.create({
            nome: 'Antônia Fluture',
            email: 'antonia@email.com',
            senha: '12345678'
        });
        expect(usuario.email).toContain('@');
    });
    it('deve validar que nome foi preenchido e tem pelo menos 3 caracteres', async () => {
        const usuario = await Usuarios.create({
            nome: 'Ana',
            email: 'ana@email.com',
            senha: '12345678'
        });
        expect(usuario.nome).toHaveLength(3);
    });
});
