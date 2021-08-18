# Fazer paginação nos controllers

## Services.js

Para que seja possível adicionar parâmetros de paginação nos controllers, vamos alterar o método `pegaTodosOsRegistros` na service.

Devemos incluir agora `agregadores` como parâmetro, além do `where`.

```javascript
async pegaTodosOsRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo].findAll({
        where: { ...where },
        ...agregadores,
    });
}
```

## VideoController.js

Como requisito, devemos ter uma rota de páginas, em que cada página gere 5 resultados de vídeos.

Além disso, o usuário deve poder inserir qual a página que deseja visualiar.

A rota: `/videos/?page=1`

Como atualizamos nosso método `pegaTodosOsRegistros`, agora devemos acrescentar um novo parâmetro, como pede `agregadores`.

Neste caso, será: 

```javascript
{
    limit: limit,
    offset: offset,
    order: order
}
```

Segundo Sequelize, 

- limite = número de resultados por página
- offset = page * limit (ou seja, quantos resultados irá pular para ir pra próxima pagina)
- order = forma de ordenação

Estes parâmetros iremos definir como variáveis no início do método `pegaTodosOsVideos`, da mesma forma que possibilitados a busca (`search`).

Também temos que pegar a página atual via query, ou seja, o que o usuário passará via url.

```javascript
const page = req.query.page;
const limit = 5;
const offset = (page ? parseInt(page * limit) : 0);
const order = [['id', 'ASC']];
```

## CategoriaController.js

Repetir o que foi feito no controller de vídeos. Os requisitos são os mesmos: poder acessar a rota de páginas via query (`/categorias/?page=1`).

E o `limit` será a quantidade de resultados por página = 5.

Lembrar que sempre se inicia na página 0.

Ambos os métodos `pegaTodasAsCategorias` e `pegaTodosOsVideos` usam o mesmo service = `pegaTodosOsRegistros. Por isso, aceitam os mesmos parâmetros de paginação (`limit`, `offset` e `order`).


