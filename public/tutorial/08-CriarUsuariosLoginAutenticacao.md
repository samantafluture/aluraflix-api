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
Usuarios.addHook('beforeSave', async usuario => {
    if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 8);
    }
});
```