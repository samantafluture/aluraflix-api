# Construção de uma API em Node.js

## Tutorial

1. Preparar do Ambiente
2. Criar modelos e pouplar banco de dados
3. Criar services, controllers e rotas
4. Criar novas tabelas e associações
5. Criar requisições relacionais e buscas
6. Fazer validações nos modelos
7. Fazer paginação nos controllers

## Requisitos

### Bancos de dados

- [x] Tabela Categorias (id, titulo, cor)
- [x] Tabela Videos (id, titulo, descricao, url)
- [x] Relação de associação (foreign kay "categoria_id" na tabela Videos)

### Rotas

1. Categorias
- [x] get/categorias
- [x] get/categorias/:id
- [x] post/categorias
- [x] put/categorias/:id
- [x] delete/categorias/:id

1. Videos
- [x] get/videos
- [x] get/videos/:id
- [x] post/videos
- [x] put/videos/:id
- [x] delete/videos/:id

3. Relações
- [x] Agrupar vídeos e categorias; para cada vídeo, uma categoria
- [x] Exibir vídeo por categoria: categorias/:id/videos/    

4. Buscas
- [x] Busca de vídeo por título: /videos/?search=titulo

5. Paginação
- [x] Criar paginação com 5 resultados por página usando rota `/?page=1`

6. Sem autenticação
- [ ] Criar rota get/videos/free com número fixo de filmes disponíveis

### Validações

1. Categorias
- [x] `id = 1` deve chamar `livre`
- [x] Caso ela não seja especificada na criação do vídeo, vamos atribuir o `ID = 1`
- [x] Uma nova categoria não pode ser criada caso tenha algum campo vazio
- [x] Caso em branco, informar: `O campo é obrigatório`

2. Vídeos
- [x] Todos os campos devem ser obrigatórios e validados

### Autenticação

- [ ] Apenas usuários autenticados podem acessar rotas GET, POST, PUT e DELETE
- [ ] Caso contrário, retornar mensagem `Não autorizado` ou `Credenciais inválidas`
- [ ] Caso usuário e senha inválidos, informar `Usuário e senha inválidos`

### Testes

- [x] Testar rotas via Postman
- [ ] Testes unitários para modelos e controllers
- [ ] Testes de integração

## Integração com frontend

- [ ] Fetch API via Reactjs