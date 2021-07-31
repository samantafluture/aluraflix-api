# Construção de uma API em Node.js

## Tutorial

1. Preparar do Ambiente
2. Criar modelos e pouplar banco de dados
3. Criar services, controllers e rotas
4. Criar novas tabelas e associações

## Requisitos

### Bancos de dados

- [x] Tabela Categorias (id, titulo, cor)
- [ ] Tabela Videos (id, titulo, descricao, url)
- [ ] Relação de associação (foreign kay "categoria_id" na tabela Videos)

### Rotas

1. Categorias
- [x] get/categorias
- [x] get/categorias/:id
- [x] post/categorias
- [x] put/categorias/:id
- [x] delete/categorias/:id

1. Videos
- [ ] get/videos
- [ ] get/videos/:id
- [ ] post/videos
- [ ] put/videos/:id
- [ ] delete/videos/:id

3. Relações
- [ ] Agrupar vídeos e categorias; para cada vídeo, uma categoria
- [ ] Exibir vídeo por categoria: categorias/:id/videos/    

4. Buscas
- [ ] Busca de vídeo por título: /videos/?search=titulo

### Validações

1. Categorias
- [ ] `ID = 1` deve chamar `LIVRE` e caso ela não seja especificada na criação do vídeo, vamos atribuir o `ID = 1`
- [ ] Uma nova categoria não pode ser criada caso tenha algum campo vazio
- [ ] Caso em branco, informar: `O campo é obrigatório`

2. Vídeos
- [ ] Todos os campos devem ser obrigatórios e validados

### Testes

- [ ] Testar rotas via Postman
- [ ] Testes unitários para modelos e controllers
- [ ] Testes de integração

## Integração com frontend

- [ ] Fetch API via Reactjs