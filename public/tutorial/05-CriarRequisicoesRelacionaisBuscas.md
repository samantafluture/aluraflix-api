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

Queremos atender ao requisito: buscar vídeo por título usando a rota `/videos/?search=titulo`.

Para isso, vamos passar a busca via parâmetro de query, por query strings, aberto pelo `?`e contatenando parâmetros com `&`.

Podemos usar operadores (palavras reservados que o Sequelize também possui). Um deles, que se encaixa na busca, é o `[[Op.substring]`.

1. No /controllers/VideoControler.js, importar Operadores do Sequelize

```javascript
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
```

2. Vamos reescrever o método "pegaTodosOsVideos()" com o filtro de busca, funcionando com ou sem a query de busca

```javascript
static async pegaTodosOsVideos(req, res) {
    const { search } = req.query;
    const where = {};
    search ? (where.titulo = {}) : null;
    search ? (where.titulo[Op.substring] = search) : null;
    try {
      const todosOsVideos = await videosServices.pegaTodosOsRegistros(where);
      return res.status(200).json(todosOsVideos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

No código acima, usamos o parâmetro "search" para ser aquele que será adicionado na URL. 

O método checa se este parâmetro foi passado pelo usuário. Se sim, então ele compara o que foi passado com o título do vídeo e traz os vídeos que contém esta "subtring" em seus títulos. Se não houver houver vídeo com esta "substring", retorna um array vazio.

Caso não seja passado o parâmetro "search", então o método retornará todos os vídeos da tabela.

4. Manter a rota "/videos" como get no /routes/videosRoute.js

5. Na hora de testar no Postman, usar a rota: `/videos/search=titulo`, sendo `titulo` uma string/palavra-chave passada pelo usuário

