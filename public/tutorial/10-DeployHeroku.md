# Deploy no Heroku

## 1. Conectar repositório GitHub com Heroku

- se cadastrar e logar no Heroku
- criar um novo app de nome único
- conectar com sua conta no GitHub
- colocar para fazer build exatamente o mesmo repositório em que está o projeto
- adicionar pipeline de build com mesmo nome do projeto
- autorizar build automático
- não se preocupe ainda com os erros!

## 2. Adicionar add-ons necessários

- neste caso, é preciso adicionar:
    - redis heroku (precisa colocar cartão de crédito, porém é gratuito)
    - cleardb para mysql
- adicionar ambos os add-ons via dashboard
- as configurações de ambos os databases será feita abaixo

## 3. Preparar ambiente de produção no app

### Procfile

- criar arquivo `Procfile` com `web: npm start`
- no arquivo `package.json`, ter o script `start": "node ./api/server.js`
- no lugar de `server.js`, pode ser `app.js` ou `index.js` dependendo do projeto

### Port

- no arquivo `server.js` (ou outro onde fará o `app.listen`), adicionar variável de ambiente, que será usada pelo Heroku
- neste caso: `app.listen(process.env.PORT || 3000);`

### Redis

- no arquivo `blacklist.js` ou qualquer outro onde irá criar uma instância Redis
- adicionar a url passada pelo add-on heroku redis

```javascript
const redis = require('redis');
module.exports = redis.createClient(process.env.REDIS_URL, {
    prefix: 'blacklist:'
});
```

### Banco de dados

- no arquivo `config.js`, adicionar a variável de ambiente do banco de dados para produção
- a url `'CLEARDB_DATABASE_URL'` é recebida do `cleardb` ao adicionar este add-on no app no heroku
- guarde esta url para os próximos passos

```javascript
    production: {
        use_env_variable: 'CLEARDB_DATABASE_URL'
    }
```

- caso esteja usando um `config` arquivo `.js` e não `.json`, trocar a extensão do arquivo nos seguintes arquivos: `models/index.js` e `.sequelizerc`

## 4. Adicionar variáveis de ambiente no Heroku

- no dashboard do heroku, clicar em `settings`
- ir para configuração das variáveis de ambiente
- setar as variávies que estão no `.env` (como `JWT_TOKEN`)
- setar a url `CLEARDB_DATABASE_URL` enviada pelo cleardb
- é possível setar as variáveis pelo `heroku cli`

```bash
cd myapp
heroku config:set CLEARDB_DATABASE_URL=mysql://[username]:[password]@[host]/[database name]?reconnect=true
```

Mais infos sobre configuração das variáveis [aqui](https://devcenter.heroku.com/articles/config-vars#managing-config-vars).

## 5. git push & build

- com tudo configurado, comite as atualizações do projeto
- após o `push`, o heroku fará o build automaticamente
- fique de olho nos logs

```bash
git add .
git commit -m "atualizacoes para heroku"
git push
```

## 6. Migrations e Seeders do Sequelize

- ao acessar a url do app, verá que as tabelas não foram criadas
- para isso, deverá fazer as `migrations` do sequelize
- faça também os seeders, para que as tabelas sejam preenchidas com dados testes (caso desejar)

```bash
heroku run sequelize db:migration
heroku run sequelize db:seed:all
```

- pronto!

