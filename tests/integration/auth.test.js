require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Usuarios } = require('../../api/models');

describe('Autenticação', () => {
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
