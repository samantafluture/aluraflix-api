const Services = require("../services/Services");
const videosServices = new Services("Videos");

class VideoController {
  static async pegaTodosOsVideos(req, res) {
    try {
      const todosOsVideos = await videosServices.pegaTodosOsRegistros();
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
        return res.status(200).json({ mensagem: `vídeo ${id} não existe` });
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
      return res
        .status(200)
        .json({ mensagem: `vídeo ${id} atualizado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removeVideo(req, res) {
    const { id } = req.params;
    try {
      await videosServices.apagaRegistro(id);
      return res.status(200).json({mensagem: `vídeo ${id} removido`})
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = VideoController;
