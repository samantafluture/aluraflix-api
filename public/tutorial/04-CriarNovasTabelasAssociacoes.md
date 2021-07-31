# Criar Novas Tabelas e Associações

## Criar novo modelo

Agora, vamos criar a tabela Videos, que possui uma chave-estrangeira (categoria_id) da tabela Categorias.

|    | Videos       |        |
|----|--------------|--------|
| PK | ID           | int    |
|    | titulo       | string |
|    | descricao    | string |
|    | url          | string |
| FK | categoria_id | ID     |

Ao criarmos uma tabela que possui uma foreign-key, não devemos criar este atributo. Apenas os dados que são seus próprios, e não importados de outra tabela. Por exemplo, aqui não criaremos a coluna "categoria_id". Veremos como isso ocorrerá mais a frente!

1. No terminal, use o cli do Sequelize para criar o novo modelo baseado na tabela Videos

`npx sequelize-cli model:create --name Videos --attributes titulo:string,descricao:string,url:string`

2. O Sequelize criará um novo arquivo "videos.js" na pasta /models

3. Antes de rodar a migração para mandar a nova tabela ao banco, vamos falar da associação entre as tabelas, criando a chave-estrangeira

## Associar tabelas

A relação entre as tabelas é de UMA categoria para MUITOS vídeos, ou seja, One-To-Many.

Segundo o Sequelize, a associação `A.hasMany(B)` possui esta relação entre A e B, onde a chave-estrangeira seria definida no modelo B.

Neste caso, seria: `Categoria.hasMany(Videos)`.

1. Abrir os arquivos de modelos models/categorias.js e models/videos.js, onde serão feitas as associações

2. Adicionar o método `hasMany` como relação, no modelo "Categorias", passando exatamente o nome da coluna que queremos criar para o categoria_id

* models/categorias.js

```javascript
Categorias.hasMany(models.Videos, {
    foreignKey: "categoria_id"
})
```

3. Adicionar o outro lado da relação, usando o método `belongsTo` do Sequelize, referenciando onde está a associação (a coluna/chave)

* models/videos.js

```javascript
Videos.belongsTo(models.Categorias, {
    foreignKey: "categoria_id"
});
```

## Referenciar tabelas 

Referenciar nos arquivos de migrações qual será a coluna que vai receber a chaves-estrangeira (categoria_id).

Ela será na tabela Videos. Logo, inserir o atributo abaixo no migrations/...create-videos.js:

```javascript
categoria_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: { model: "Categorias", key: "id" },    
},
```

Esta coluna "categoria_id" não poderá ser nula, será do tipo int e irá referenciar o modelo Categorias, usando seu id como chave.

## Rodas as migrações

1. Rodar as migrações para que o Sequelize se conecte ao banco e crie a tabela Videos com a associação feita

2. No terminal, usar o comando: `npx sequelize-cli db:migrate`

3. No MySQL, veja se a tabela vídeos foi criada e quais são suas colunas:

`show tables;`
`describe Videos;`

```bash
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| id           | int(11)      | NO   | PRI | NULL    | auto_increment |
| titulo       | varchar(255) | YES  |     | NULL    |                |
| descricao    | varchar(255) | YES  |     | NULL    |                |
| url          | varchar(255) | YES  |     | NULL    |                |
| categoria_id | int(11)      | NO   | MUL | NULL    |                |
| createdAt    | datetime     | NO   |     | NULL    |                |
| updatedAt    | datetime     | NO   |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
````

```bash
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| titulo    | varchar(255) | YES  |     | NULL    |                |
| cor       | varchar(255) | YES  |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
````





