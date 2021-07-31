# Criar Controladores e Rotas

Vamos usar o padrão MVC.

## Criar services

1. Criar pasta /services dentro da /api
2. Criar 3 arquivos de base: "index.js", "Services.js" e "CategoriasServices.js"

### services/index.js

Será o ponto de entrada para os serviços. Aqui deverá importar o service de categorias e exportá-lo para uso. Bem como outros serviços a serem adicionados.

```javascript
const CategoriasServices = require("./CategoriasServices");
module.exports = {
  CategoriasServices: CategoriasServices,
};
```

### services/Services.js

Arquivo principal de services, onde terão as métodos que farão contato com o banco de dados e Sequelize. Todos os controladores poderão usá-los.

1. Criar uma class de mesmo nome
2. Criar um construtor que recebe o nome do modelo a ser usado e traz para o contexto da classe usando "this"
3. Criar os métodos async que retornam o métodos Sequelize (que, por sua vez, fazem as operações de bancos de dados)

Exemplo: 

```javascript
async pegaTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }
```

### services/CategoriasServices.js

Depois dos services padrões, é a vez de criar um arquivo que terá métodos específicos de cada modelo (caso houver).

Se não houver, o arquivo fica vazio, apenas com a classe em questão herdando da Services:

```javascript
const Services = require("./Services");
class CategoriasServices extends Services {
  constructor() {
    super("Categorias");
  }
}
module.exports = CategoriasServices;
```

## Criar controllers

1. Criar pasta /controllers dentro da pasta /api
2. Criar arquivo "CategoriaController.js" dentro da nova pasta 

O controlador será responsável por fazer a intermediação entre o modelo Categoria e os serviços que se conectam ao banco de dados. Deverá receber e devolver requisições HTTP.

Um método de exemplo será o de requisitar todas as categorias no banco de dados. 

Envolve o retorno em um try/catch, onde o try será a resposta de status 200 e o catch será a de erro 400.

```javascript
static async pegaTodasAsCategorias(req, res) {
    try {
      const todasAsCategorias = await categoriasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsCategorias);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

## Criar rotas

1. Criar pasta /routes dentro da pasta /api
2. Criar arquivos "index.js" e "categoriasRoute.js" dentro da nova pasta 

### routes/index.js

O "index.js" será o ponto de entrada das rotas na aplicação, devendo importar e exportar todas as rotas para uso:

```javascript
const bodyParser = require("body-parser");
const categorias = require("./categoriasRoute");
module.exports = (app) => {
  app.use(bodyParser.json(), categorias);
};
```

### routes/categoriasRoute.js

Este arquivo terá as rotas do modelo Categorias.

Um primeiro exemplo será a rota /categorias, que usa o método de pegar todas as categorias registradas no banco de dados.

```javascript
router.get("/categorias", CategoriaController.pegaTodasAsCategorias);
```

