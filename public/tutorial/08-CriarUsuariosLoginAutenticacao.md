# Criar sistema de usuário, login e autenticação

## Criar novo modelo Usuários

- criar modelo pela linha de comando do Sequelize
- criar migrations do novo modelo
- fazer um seed do novo modelo
- criar controller e rotas
- incluir serviço do modelo de usuários

## Senha hash 

- usar a biblioteca `bcrypt` para senha hash do usuário

`npm install bcrypt`

- no modelo, adicionar um `hook` para gerar um hash da senha toda vez que Usuários for instanciado 

- usar método `hash` com `salt` de 8

```javascript
Usuarios.addHook('beforeCreate', async (usuario) => {
    const senhaHash = await bcrypt.hash(usuario.senha, 8);
    usuario.senha = senhaHash;
});
```

## Criar pasta /middlewares e arquivos de autenticação

/middlewares/
- index.js (exportar os outros módulos)
- validaUsuario.js
- autenticaUsuario.js

## Validar usuário em validaUsuario.js 

- instalar e importar `passport` e `jwt`

`npm install passport passport-local passport-http-bearer`
`npm install jsonwebtoken`

- criar função para verificar usuário
- caso o usuário não exista, lançar um erro

```javascript
function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com este email');
    }
}
```

- criar função para validar a senha
- a senha passada pelo usuário deve bater a sua senha hash guardada
- usar o método `compare` do `bcrypt`

```javascript
async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos');
    }
}
```

### Estratégias de autenticação

1. Estratéga local

- usando o passport, criar uma estratégia de autenticação local
- esta será usada no login
- a estratégia abaixo valida o usuário via email (verificando se existe um usuário com determinado email)
- em seguida, valida a senha (verificando se a senha passada é a mesma guardada hash)
- caso seja, é permitido o login

```javascript
passport.use(
    // objeto de configuração da estratégia local
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false,
        },
        async (email, senha, done) => {
            // função de verificação
            try {
                const usuario = await models.Usuarios.findOne({
                    where: { email },
                });
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (erro) {
                done(erro);
            }
        },
    ),
);
```

- criar o arquivo `authController`, onde terá as funções de login e logout
- por enquanto, a de login apenas manda um status positivo e corpo vazio

```javascript
class AuthController {
    static logaUsuario(req, res) {
        res.status(204).send();
    }
```

- adicionar a rota `/login` em um novo arquivo `authRoute`, do tipo POST, usando o controller criado acima e a estratégia local criada anteriomente

```javascript
.post(
        '/login',
        autenticaUsuario.local,
        AuthController.logaUsuario,
    );
```

- testar o login no Postman
- deverá usar mesmo email e senha para ter sucesso

2. Esratégia bearer

- usar o módulo `jwt` e seus métodos para criar a estratégia `bearer`
- primeiro, irá devolver o payload caso haja um token válido
- depois, recupera este usuário via id

```javascript
passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const payload = jwt.verify(token, process.env.JWT_TOKEN);
            const usuario = await models.Usuarios.findOne({
                where: { id: payload.id },
            });
            done(null, usuario, { token: token });
        } catch (erro) {
            done(erro);
        }
    }),
);
```

- no `authController`, criar uma função para a criação do token via jwt

```javascript
function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '15m',
    });
    return token;
}
```

## Autenticar usuário em autenticaUsuario.js 

- este arquivo servirá como middleware para realizar as autenticações criadas anteriormente, porém com mensagens e tratamentos de erro de login e token

- usar esse módulo no lugar do anterior para autenticar o usuário nas rotas `auth` e também em todas as que precisam de autenticação

- segundo regra de negócio: GET, POST, PUT, DELETE

- exemplo:

```javascript
router
    .get(
        '/usuarios',
        autenticaUsuario.bearer,
        UsuarioController.pegaTodosOsUsuarios,
    )
    .get(
        '/usuarios/:id',
        autenticaUsuario.bearer,
        UsuarioController.pegaUsuarioPeloId,
    )
```

- deixar a rota `/videos/free` com GET sem autenticação

```javascript
.get(
        '/videos/free',
        VideoController.pegaTodosOsVideos,
    )
```

## Blacklist com Redis

- instalar `redis` na máquina
- rodar `redis` com: `redis-server` no terminal
- inserir `require('./redis/blacklist');` no `index.js` da api
- criar uma nova pasta na /api/ chamada /redis/
- criar dentro os seguintes arquivos: blacklist.js e manipulaBlacklist.js

### blacklist.js

- colocar o prefixo `blacklist:` em todos os tokens que irão para a blacklist dentro da base de dados no redis

`module.exports = redis.createClient({ prefix: 'blacklist:' });`

### manipulaBlacklist.js

- criar duas funções para manipular a blacklist:

1. adiciona: para adicionar um token que foi dado logout na blacklist

```javascript
adiciona: async (token) => {
        const dataExpiracao = jwt.decode(token).exp;
        const tokenHash = geraTokenHash(token);
        await setAsync(tokenHash, '');
        blacklist.expireat(tokenHash, dataExpiracao);
    }
```

2. contem token: para verificar se determinado token passado pelo usuário está na blacklist

```javascript
contemToken: async (token) => {
        const tokenHash = geraTokenHash(token);
        const resultado = await existsAsync(tokenHash);
        return resultado === 1; // significa que a base contém o token
    }
```

- passar o token a partir de uma função de hash, para diminuir o tamanho do payload

```javascript
function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}
```

- e usar a lib `promisify` para transformar certos métodos em `promises`

```javascript
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);
```

- finalizando este arquivo, deverá modificar algumas funções

### autenticaUsuario.js

- inserir uma forma de capturar o token, com a linha abaixo, na estratégia `bearer`

`req.token = info.token;`

- criar a função de `logout` no `authController`

```javascript
static async logoutUsuario(req, res) {
        try {
            const token = req.token;
            await blacklist.adiciona(token);
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
```

- adicionar a verificação da blacklist na função de `login`

```javascript
    static logaUsuario(req, res) {
        const token = criaTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }
```

- criar a rota de `logout` em `authRoute`, usando a autenticação `bearer`

```javascript
    .get(
        '/logout',
        autenticaUsuario.bearer,
        AuthController.logoutUsuario,
    )
```