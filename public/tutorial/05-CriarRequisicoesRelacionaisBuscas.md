# Criar Requisições Relacionais e Buscas

## Criar rota que pegue vídeos por categoria

1. Vamos usar o método já criado no Services.js abaixo

```javascript
async encontraEContaRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo].findAndCountAll({
      where: { ...where },
      ...agregadores,
    });
  }
```

Este método permite passar um filtro `where` do SQL e também outros agregadores do Sequelize (como ordem e limite de resposta para paginação). 

Ele chama o método findAndCountAll() do Sequelize para isso.

2. No VideoControler.js, criar o método `pegaVideosPorCategoria()` e passar o seguinte filtro e agregadores:

- categoria_id
- ordem: por título, ascendente (ordem alfabética)
- limite: 20 respostas

```javascript
static async pegaVideosPorCategoria(req, res) {
    const { categoriaId } = req.params;
    try {
      const todosOsVideos = await videosServices.encontraEContaRegistros(
        { categoria_id: Number(categoriaId) },
        { limit: 20, order: [["titulo", "ASC"]] }
      );
      return res.status(200).json(todosOsVideos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

3. Adicionar a rota GET "/categorias/:categoriaId/video" no videosRoute.js:

```javascript
route.get("/categorias/:categoriaId/videos", VideoController.pegaVideosPorCategoria);
```

Não esquecer que o id da categoria deve ir com a const criada no método (categoriaId).

Dessa forma, conseguimos fazer uma requisição que relaciona e agrupa as duas tabelas.

O resultado traz dois objetos:
- count (quantidade de vídeos nesta categoria)
- rows (as respostas/vídeos em si)

## Habilitar busca de vídeo por título

