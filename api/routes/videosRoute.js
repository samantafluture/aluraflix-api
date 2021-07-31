const { Router } = require("express");
const VideoController = require("../controllers/VideoController");

const router = Router();

router
  .get("/videos", VideoController.pegaTodosOsVideos)
  .get("/videos/:id", VideoController.pegaVideoPeloId)
  .post("/videos", VideoController.criaVideo)
  .put("/videos/:id", VideoController.atualizaVideo)
  .delete("/videos/:id", VideoController.removeVideo);

module.exports = router;
