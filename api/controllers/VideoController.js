const Services = require('../services/Services');
const videosServices = new Services('Videos');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class VideoController {
    static async pegaTodosOsVideos(req, res) {
        const { search } = req.query;
        const where = {};
        search ? (where.titulo = {}) : null;
        search ? (where.titulo[Op.substring] = search) : null;

        const limit = 5;
        let page = 0;
        const pageAsNumber = Number.parseInt(req.query.page);
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }

        try {
            const todosOsVideos = await videosServices.pegaTodosOsRegistros(
                where,
                {
                    limit: limit,
                    offset: page * limit,
                    order: [['id', 'ASC']],
                }
            );
            return res.status(200).json(todosOsVideos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaVideoPeloId(req, res) {
        const { id } = req.params;
        try {
            const video = await videosServices.pegaUmRegistro({ id });
            if (video === null) {
                return res
                    .status(401)
                    .json({ mensagem: `vídeo ${id} não existe` });
            } else {
                return res.status(200).json(video);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaVideo(req, res) {
        const novoVideo = req.body;
        try {
            const novoVideoCriado = await videosServices.criaRegistro(
                novoVideo
            );
            return res.status(200).json(novoVideoCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaVideo(req, res) {
        const { id } = req.params;
        const infosAtualizadas = req.body;
        try {
            await videosServices.atualizaRegistro(infosAtualizadas, id);
            return res.status(200).json({ mensagem: `vídeo ${id} atualizado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async removeVideo(req, res) {
        const { id } = req.params;
        try {
            await videosServices.apagaRegistro(id);
            return res.status(200).json({ mensagem: `vídeo ${id} removido` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaVideosPorCategoria(req, res) {
        const { categoriaId } = req.params;
        try {
            const todosOsVideos = await videosServices.encontraEContaRegistros(
                { categoria_id: Number(categoriaId) },
                { limit: 20, order: [['titulo', 'ASC']] }
            );
            return res.status(200).json(todosOsVideos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = VideoController;
