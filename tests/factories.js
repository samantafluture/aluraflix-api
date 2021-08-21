const faker = require('faker');
const { factory } = require('factory-girl');
const { Usuarios, Categorias, Videos } = require('../api/models');

factory.define('Usuarios', Usuarios, {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.internet.password()
});

factory.define('Categorias', Categorias, {
    titulo: faker.lorem.word,
    cor: faker.internet.color
});

factory.define('Videos', Videos, {
    titulo: faker.lorem.words,
    descricao: faker.lorem.sentences,
    url: faker.internet.url,
    categoria_id: '1'
});

module.exports = factory;
