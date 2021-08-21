/* eslint-disable no-unused-vars */
module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Usuarios',
            [
                {
                    nome: 'Samanta Fluture',
                    email: 'samanta@email.com',
                    senha: '12345',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Alissa Osumi',
                    email: 'alissa@email.com',
                    senha: '12345',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Rebeca Junior',
                    email: 'rebeca@email.com',
                    senha: '12345',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Ronaldo Souza',
                    email: 'ronaldo@email.com',
                    senha: '12345',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Ana Cruz',
                    email: 'ana@email.com',
                    senha: '12345',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        ),

    down: async (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Usuarios', null, {})
};
