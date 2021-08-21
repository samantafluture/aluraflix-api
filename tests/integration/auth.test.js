const request = require('supertest');
const app = require('../../api/app');
const truncate = require('../utils/truncate');
const { Usuarios } = require('../../api/models');

describe('Autenticação', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve listar vídeos sem autenticação', async () => {
        const response = await request(app).get('/videos/free');
        expect(response.status).toBe(200);
    });
    it('deve criar usuário ao preencher campos corretamente', async () => {
        const response = await request(app).post('/usuarios').send({
            nome: 'teste',
            email: 'teste@email.com',
            senha: '12345678'
        });
        expect(response.status).toBe(200);
    });
    it('não deve logar usuário com credenciais inválidas', async () => {
        const usuario = await Usuarios.create({
            nome: 'Rosa Fluture',
            email: 'rosa@email.com',
            senha: '12345678'
        });
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '123123123'
        });

        expect(response.status).toBe(401);
    });
    it('deve logar usuário com credenciais válidas', async () => {
        const usuario = await Usuarios.create({
            nome: 'Sam Fluture',
            email: 'sam@email.com',
            senha: '12345678'
        });
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '12345678'
        });

        expect(response.status).toBe(204);
    });

    // it('deve criar um token para o usuário', async () => {
    //     const usuario = await Usuarios.create({
    //         nome: 'Teste 3',
    //         email: 'teste3@email.com',
    //         senha: '12345678'
    //     });
    //     const payload = { id: usuario.id };
    //     const token = jwt.sign(payload, process.env.JWT_TOKEN);
    //     expect(token).toBeDefined();
    // });
});
