const request = require('supertest');
const app = require('../../api/app');
const truncate = require('../utils/truncate');

describe('Controllers', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve listar vídeos sem autenticação', async () => {
        const response = await request(app).get('/videos/free');

        expect(response.status).toBe(200);
    });
    it('não pode acessar rotas privadas caso não esteja autenticado', async () => {
        const response = await request(app).get('/videos');

        expect(response.status).toBe(401);
    });
    it('deve devolver conteúdo no formato json', async () => {
        await request(app)
            .get('/videos/free')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
