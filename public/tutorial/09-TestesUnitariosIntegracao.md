# Testes Unitários e de Integração

## Testes Unitários

- instalar a ferramenta de testes Jest

`npm install --save-dev jest`

- onde guardar os arquivos de teste?
- manter a mesma estrutura de arquivos dentro da pasta de testes
- seguir a estrutura daquilo que vamos testar (unit, integration)
- criar o arquivo de teste com a extensão `.test.js`

```bash
├── aluraflix-api
│   ├── api
│   │   ├── models
│   │   │   ├── categorias.js
│   │   │   ├── usuarios.js
│   │   │   ├── videos.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── categoriaController.js
│   │   │   ├── usuarioController.js
│   │   │   ├── videoController.js
│   ├── tests
│   │   ├── unit
│   │   │   ├── usuario.test.js
```

