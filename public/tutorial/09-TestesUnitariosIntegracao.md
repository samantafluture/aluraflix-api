# Testes Unitários e de Integração

## Preparar ambiente de testes

### Instalação de pacotes

- instalar as ferramentas de testes Jest e Supertest

`npm install --save-dev jest`
`npm install --save-dev supertest`

- instalar novas dependências auxiliares para a base de dados de teste (faker, sqlite3 e factory-girl)

`npm install --save-dev sqlite3`
`npm install --save-dev factory-girl`
`npm install --save-dev faker`

### Organizar pasta de teste e arquivos .test.js

- onde guardar os arquivos de teste?
- manter a mesma estrutura de arquivos dentro da pasta de testes
- seguir a estrutura daquilo que vamos testar (unit, integration)
- criar o arquivo de teste com a extensão `.test.js`

```bash
├── aluraflix-api
│   ├── tests
│   │   ├── unit
│   │   │   ├── usuario.test.js
│   │   ├── integration
│   │   │   ├── auth.test.js
│   │   ├── utils
│   │   │   ├── factiories.test.js
│   │   │   ├── truncate.test.js
│   ├── database.sqlite
```

### Configurar arquivos para testes

**jest.config.js**

- configurar o arquivo `jest.config.js` possibilitando o seguinte:
    - `bail: true` 
    - `clearMocks: true`
    - `testEnvironment: 'jest-environment-node'`
    - passar o testMatch para `'**/tests/**/*.test.js?(x)'`

**config/config.js**

- configurar o arquivo `config.js`, adicionando as mesmas variáveis de ambiente para testes que já estão no `.env`
- incluir o `sqlite` e seu storage
- o sqlite será usado como uma base local `in:memory` para não sujar a base que já temos

```javascript
test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'sqlite',
        storage: './tests/database.sqlite'
    }
```

**package.json**

- configurar o arquivo `package.json` com novos scripts

```json
  "scripts": {
    "start": "node ./api/server.js --ignore tests",
    "pretest": "NODE_ENV=test sequelize db:migrate",  
    "test": "NODE_ENV=test jest",
    "posttest": "NODE_ENV=test sequelize db:migrate:undo:all"
  }
```

## Base de dados para testes

- o sequelize dá a opção de usar uma base de dados em memória `sqlite`
- foi por isso que instalar o `sqlite3` e adicionamos o `storage` e `dialect` no ambiente de testes no arquivo de `config.js`
- ela funciona em formato de arquivo, não é preciso configurar base de dados!
- não é preciso credenciais

## Testes unitários



## Testes de integração






