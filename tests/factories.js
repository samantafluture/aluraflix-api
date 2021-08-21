const faker = require('faker');
const { factory } = require('factory-girl');
const { Usuarios, Categorias, Videos } = require('../api/models');

factory.define('Usuarios', Usuarios, {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    senha: faker.internet.password()
});

factory.define('Categorias', Categorias, {
    titulo: 'javascript',
    cor: '#fcba03'
});

factory.define('Videos', Videos, {
    titulo: 'Tutorial Node.js e Sequelize',
    descricao: 'Vídeo sobre como criar uma APi com Node.js',
    url: 'https://www.youtube.com/watch?v=2G_mWfG0DZE&t',
    categoria_id: '1'
});

module.exports = factory;
