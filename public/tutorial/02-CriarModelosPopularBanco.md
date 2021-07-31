# Criar Modelos e Popular Banco de Dados

## Criar Modelos

Quando começamos a trabalhar com bancos, primeiro identificamos as tabelas que são mais "simples", ou seja, que não utilizam dados de outras tabelas.

No nosso caso, a tabela Categorias não depende de nenhuma outra tabela. Já a Videos depende do categoria_id.

|    | Categorias |        |
|----|------------|--------|
| PK | ID         | int    |
|    | titulo     | string |
|    | cor        | string |

|    | Videos       |        |
|----|--------------|--------|
| PK | ID           | int    |
|    | titulo       | string |
|    | descricao    | string |
|    | url          | string |
| FK | categoria_id | ID     |

Para criar modelos com Sequelize, vamos usar o `sequelize-cli` passando o nome do modelo que queremos criar (baseado nas tabelas) e seus atributos com seus tipos de dados (ou seja, todas as colunas que nosso modelo terá):

`npx sequelize-cli model:create --name Categorias --attributes titulo:string,cor:string`

Em seguida, dois novos arquivos serão criados de forma automática pelo Sequelize:
- models/categorias.js
- migrations/202107031171611-create-categorias.js

## Rodando Migrações

1. Realizar a primeira migração do projeto:

`npx sequelize-cli db:migrate`

2. Verificar o banco de dados para ver as tabelas que foram criadas a partir da migração (neste caso, Categorias):

`use aluraflix;`
`show tables;`
`describe Categorias;`

## Popular o Banco de Dados

1. Usar uma query SQL para criar um registro de teste na tabela Categorias:

`insert into Categorias (titulo, cor, createdAt, updatedAt) values ("nodejs", "#FF0000", NOW(), NOW());`

2. Verificar os dados registrados:

`select * from Categorias`

Para popular de forma automática usando o Sequelize, vamos usar os arquivos de "seed".

3. No terminal, gere um arquivo semente ("seed") de teste:

`npx sequelize-cli seed:generate --name demo-categoria`

4. Verifique se na pasta /seeders foi criado o arquivo com nome dado acima (demo-categoria)

5. Insira no arquivo de seed algumas categorias de teste, como retorno da função de template:

```javascript
return queryInterface.bulkInsert(
      "Categorias",
      [
        {
          titulo: "reactjs",
          cor: "#87CEFA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
```

6. Conecte os seeds com o banco de dados, usando Sequelize:

`npx sequelize-cli db:seed:all`

7. Volte para o banco de dados e veja os registros inseridos: 

`select * from Categorias`

