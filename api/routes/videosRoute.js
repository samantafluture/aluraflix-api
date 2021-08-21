const { Router } = require('express');
const { autenticaUsuario } = require('../middlewares');
const { VideoController } = require('../controllers');

const router = Router();

router
    .get('/videos/free', VideoController.pegaTodosOsVideos)
    .get('/videos', autenticaUsuario.bearer, VideoController.pegaTodosOsVideos)
    .get(
        '/videos/:id',
        autenticaUsuario.bearer,
        VideoController.pegaVideoPeloId
    )
    .get(
        '/categorias/:categoriaId/videos',
        autenticaUsuario.bearer,
        VideoController.pegaVideosPorCategoria
    )
    .post('/videos', autenticaUsuario.bearer, VideoController.criaVideo)
    .put('/videos/:id', autenticaUsuario.bearer, VideoController.atualizaVideo)
    .delete(
        '/videos/:id',
        autenticaUsuario.bearer,
        VideoController.removeVideo
    );

module.exports = router;
