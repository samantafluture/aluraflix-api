/* eslint-disable no-useless-escape */
const factory = require('../utils/factories');

describe('Vídeos', () => {
    it('deve validar que o nome do vídeo não é vazio', async () => {
        const categoria = await factory.create('Categorias', {
            categoria_id: '1'
        });
        const video = await factory.create('Videos', {
            categoria_id: categoria.id
        });

        expect(video.titulo).not.toBe('');
    });
    it('deve validar que a descrição do vídeo não é vazio', async () => {
        const categoria = await factory.create('Categorias', {
            categoria_id: '1'
        });
        const video = await factory.create('Videos', {
            categoria_id: categoria.id
        });

        expect(video.descricao).not.toBe('');
    });
    it('deve validar que a url do vídeo é válida', async () => {
        const categoria = await factory.create('Categorias', {
            categoria_id: '1'
        });
        const video = await factory.create('Videos', {
            categoria_id: categoria.id
        });

        const urlRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        expect(video.url).toMatch(urlRegEx);
    });
});
