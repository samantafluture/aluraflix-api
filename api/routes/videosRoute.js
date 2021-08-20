const { Router } = require('express');
const { middlewaresAutenticacao } = require('../middlewares');
const VideoController = require('../controllers/VideoController');

const router = Router();

router
    .get(
        '/videos/free',
        VideoController.pegaTodosOsVideos,
    )
    .get(
        '/videos',
        middlewaresAutenticacao.bearer,
        VideoController.pegaTodosOsVideos,
    )
    .get(
        '/videos/:id',
        middlewaresAutenticacao.bearer,
        VideoController.pegaVideoPeloId,
    )
    .get(
        '/categorias/:categoriaId/videos',
        middlewaresAutenticacao.bearer,
        VideoController.pegaVideosPorCategoria,
    )
    .post('/videos', middlewaresAutenticacao.bearer, VideoController.criaVideo)
    .put(
        '/videos/:id',
        middlewaresAutenticacao.bearer,
        VideoController.atualizaVideo,
    )
    .delete(
        '/videos/:id',
        middlewaresAutenticacao.bearer,
        VideoController.removeVideo,
    );

module.exports = router;
