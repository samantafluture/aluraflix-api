# Fazer Validações nos Modelos

## models/videos.js & models/categorias.js

Todos os campos da tabela Videos e da Categorias devem ser obrigatórios (ou seja, NOT NULL) e validados. 

As validações podem ser feitas diretamente nos arquivos de modelos /models.

Dentro de cada atributo, criar um objeto que deverá conter o tipo de dado (já vem por padrão do Sequelize), mais outros atributos de validação.

Exemplo de validação usando o método do Sequelize `isEmail` dentro do `validate`:

```javascript
url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            msg: "O campo URL é obrigatório e deve ser uma URL válida",
          },
        },
      },
```
## migrations/...create-video.js & migrations/...create-categoria.js

Para que não seja possível pular o campo antes de receber a mensagem de validação, colocar no arquivo de migração de cada modelo que as colunas não aceitam valor nulo, ou seja, `allowNull: false`.

```javascript
titulo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
```
