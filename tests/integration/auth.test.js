const request = require('supertest');
const app = require('../../api/app');
const truncate = require('../utils/truncate');

describe('Autenticação', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve listar vídeos sem autenticação', async () => {
        const response = await request(app).get('/videos/free');
        expect(response.status).toBe(200);
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
