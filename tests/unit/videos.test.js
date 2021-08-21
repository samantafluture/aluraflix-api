/* eslint-disable no-useless-escape */
const { Categorias, Videos } = require('../../api/models');

describe('Vídeos', () => {
    it('deve validar que o nome do vídeo não é vazio', async () => {
        await Categorias.create({
            id: '1',
            titulo: 'javascript',
            cor: '#fcba03'
        });
        const video = await Videos.create({
            titulo: 'Título teste 1',
            descricao: 'Descrição teste 1 deve ter quantos caracteres',
            url: 'https://www.youtube.com/1',
            categoria_id: '1'
        });

        expect(video.titulo).not.toBe('');
    });
    it('deve validar que a descrição do vídeo não é vazio', async () => {
        await Categorias.create({
            id: '2',
            titulo: 'css',
            cor: '#ff0000'
        });
        const video = await Videos.create({
            titulo: 'Título teste 2',
            descricao: 'Descrição teste 2',
            url: 'https://www.youtube.com/2',
            categoria_id: '2'
        });

        expect(video.descricao).not.toBe('');
    });
    it('deve validar que a url do vídeo é válida', async () => {
        await Categorias.create({
            id: '3',
            titulo: 'html',
            cor: '#ffffff'
        });
        const video = await Videos.create({
            titulo: 'Título teste 3',
            descricao: 'Descrição teste 3',
            url: 'https://www.youtube.com/watch?v=2G_mWfG0DZE&t',
            categoria_id: '3'
        });

        const urlRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        expect(video.url).toMatch(urlRegEx);
    });
});
