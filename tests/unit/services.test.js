const truncate = require('../utils/truncate');
const Services = require('../../api/services/Services');
const factory = require('../factories');

describe('criaRegistro()', () => {
    let usuariosService;
    let categoriasService;
    let videosService;

    beforeEach(async () => {
        usuariosService = new Services('Usuarios');
        categoriasService = new Services('Categorias');
        videosService = new Services('Videos');

        await truncate();
        await factory.create('Categorias', {
            id: '2'
        });
    });

    it('deve ser possível criar um novo usuário', async () => {
        const usuarioDados = {
            nome: 'Josefa',
            email: 'josefa3@email.com',
            senha: '12345678'
        };
        const usuario = await usuariosService.criaRegistro(usuarioDados);

        expect(usuario).toHaveProperty('id');
    });

    it('deve ser possível criar uma nova categoria', async () => {
        const categoriaDados = {
            titulo: 'docker',
            cor: '#ff0000'
        };
        const categoria = await categoriasService.criaRegistro(categoriaDados);

        expect(categoria).toHaveProperty('id');
    });
    it('deve ser possível criar um novo vídeo', async () => {
        const videoDados = {
            titulo: 'Tutorial de Docker',
            descricao: 'Vídeo aula sobre Docker e cultura DevOps',
            url: 'https://www.youtube.com/watch?v=Kzcz-EVKBEQ',
            categoria_id: '2'
        };
        const video = await videosService.criaRegistro(videoDados);

        expect(video).toHaveProperty('id');
    });
});

describe('pegaUmRegistro()', () => {
    let usuariosService;

    beforeEach(async () => {
        usuariosService = new Services('Usuarios');
    });

    it('deve ser possível pegar um usuário pelo id', async () => {
        const usuario = await factory.create('Usuarios', {});
        const usuarioId = await usuariosService.pegaUmRegistro(usuario.id);

        expect(usuarioId.id.toString()).toMatch(usuario.id.toString());
    });
    it('deve ser possível pegar um usuário pelo email', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'ferraz@email.com',
            senha: '12345678'
        });
        const usuarioEmail = await usuariosService.pegaUmRegistro({
            email: usuario.email
        });
        console.log(usuarioEmail, usuario);
        expect(usuarioEmail.email).toMatch(usuario.email);
    });
});

describe('encontraEContaRegistros()', () => {
    let videosService;

    beforeEach(async () => {
        videosService = new Services('Videos');

        // await truncate();
    });

    it('deve ser possível listar vídeos pelo id da categoria', async () => {
        const categoria = await factory.create('Categorias', {
            id: '4'
        });
        const video1 = await factory.create('Videos', {
            categoria_id: categoria.id
        });
        const video2 = await factory.create('Videos', {
            categoria_id: categoria.id
        });
        const listaVideos = await videosService.encontraEContaRegistros({
            categoria_id: categoria.id
        });

        console.log(listaVideos, categoria, video1, video2);
        expect(listaVideos).toHaveProperty('count', 2);
    });
});
