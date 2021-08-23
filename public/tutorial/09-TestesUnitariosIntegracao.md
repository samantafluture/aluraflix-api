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
- os scripts "pretest" e "posttest" definem comandos para serem rodados antes e depois dos testes
- vamos rodas as migrations antes do teste para que crie as tabelas no banco de teste
- e depois que terminar, ele desfaz tudo, para limpar o banco

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

## Arquivos utils/

- criar dois arquivos que irão ajudar na hora de criar os testes

1. truncate: com o objetivo de dar um drop nas tabelas e limpar todos os dados, muito útil caso não podemos ter dados duplicados
2. factories: com o objetivo de criar dados fakes e randômicos a partir de nossos modelos, usando as libs faker e factory-girl

**truncate.js**

```javascript
const { sequelize } = require('../../api/models');
module.exports = () => {
    return Promise.all(
        Object.keys(sequelize.models).map((key) => {
            return sequelize.models[key].destroy({
                truncate: true,
                force: true
            });
        })
    );
};
```

**factories.js**

```javascript
const faker = require('faker');
const { factory } = require('factory-girl');
const { Usuarios, Categorias, Videos } = require('../../api/models');

factory.define('Usuarios', Usuarios, {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.internet.password()
});

module.exports = factory;
```

## Testes unitários

Um primeiro exemplo seria testar os modelos: usuários, vídeos e categorias. Pode-se testar as validações que existem ao cadastrar cada um deles.

Também é possível testar os services, de forma que não se conectam no banco de dados, e sim apenas validem se cada uma de suas funções estão funcionando como deveriam (como criar um registro, atualizar um registro, etc).

Checar `services.test.js` para mais.

Exemplos de `usuarios.test.js`:

- testar a geração da senha hash na hora de um novo cadastramento de usuário
- testar a verificação de o email já existe na base de dados na tentativa de um novo cadastramenento

```javascript
describe('Usuários', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve criar uma senha hash válida para o usuário', async () => {
        const usuario = await factory.create('Usuarios', {
            senha: '12345678'
        });
        const compareHash = await bcrypt.compare('12345678', usuario.senha);

        expect(compareHash).toBe(true);
    });
    it('deve verificar se o usuário existe via email', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'ana@email.com'
        });
        const emailExistente = await models.Usuarios.findOne({
            where: { email: 'ana@email.com' }
        });

        expect(usuario.email).toMatch(emailExistente.email);
    });
});
```

- no exemplo acima, usa-se o método do jest `beforeEach` para rodar a função `truncate()`
- ou seja, a cada novo teste, a base de dados é limpa para não haver conflitos

## Testes de integração

Aqui podemos testar partes mais complexas do código, que na hora da execução devem conversar entre si. Por exemplo, testar rotas, controllers e sistemas de autenticação.

Abaixo, o exemplo irá testar:

- que um cadastro realizado com sucesso deve retornar status 200 (ok)
- que um usuário, ao fazer login, não tiver senha ou email válidos, deve ter o retorno 401 (não autorizado), e o oposto deve ser 200 (ok)
- que caso o usuário esteja autenticado no login, ele deve receber um token

```javascript
describe('Autenticação', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve criar usuário ao preencher campos corretamente', async () => {
        const response = await request(app).post('/usuarios').send({
            nome: 'Maria Silva',
            email: 'mariasilva@email.com',
            senha: '12345678'
        });
        expect(response.status).toBe(200);
    });
    it('não deve logar usuário com credenciais inválidas', async () => {
        const usuario = await factory.create('Usuarios', {});
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '123123123'
        });

        expect(response.status).toBe(401);
    });
    it('deve logar usuário com credenciais válidas', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'samuca@email.com',
            senha: '12345678'
        });
        const response = await request(app).post('/login').send({
            email: usuario.email,
            senha: '12345678'
        });

        expect(response.status).toBe(200);
    });
    it('deve enviar um token caso autenticado', async () => {
        const usuario = await factory.create('Usuarios', {
            email: 'mario@email.com',
            senha: '12345678'
        });
        const payload = { id: usuario.id };
        const token = jwt.sign(payload, 'secret');

        const response = await request(app)
            .post('/login')
            .set('Authorization', token)
            .send({
                email: usuario.email,
                senha: '12345678'
            });

        expect(response.header).toHaveProperty('authorization');
    });
});
```




