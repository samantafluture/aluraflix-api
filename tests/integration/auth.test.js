const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../api/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Autenticação', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve criar usuário ao preencher campos corretamente', async () => {
        const response = await request(app).post('/usuarios').send({
            nome: 'Maria Silva',
            email: 'mariasilva@email.com',
            senha: '12345678'
        });
        expect(response.status).toBe(200);
    });
    it('não deve logar usuário com credenciais inválidas', async () => {
        const usuario = await factory.create('Usuarios', {});
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '123123123'
        });

        expect(response.status).toBe(401);
    });
    it('deve logar usuário com credenciais válidas', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'samuca@email.com',
            senha: '12345678'
        });
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '12345678'
        });

        expect(response.status).toBe(200);
    });
    it('deve enviar um token caso autenticado', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'mario@email.com',
            senha: '12345678'
        });
        const payload = { id: usuario.id };
        const token = jwt.sign(payload, 'secret');

        const response = await request(app)
            .post('/login')
            .set('Authorization', token)
            .send({
                email: usuario.email,
                senha: '12345678'
            });

        expect(response.header).toHaveProperty('authorization');
    });
});
