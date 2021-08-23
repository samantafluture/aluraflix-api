module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Usuarios',
            [
                {
                    nome: 'Kelly Miranda',
                    email: 'kelly@email.com',
                    senha: '12345678',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Rebeca Junior',
                    email: 'rebeca@email.com',
                    senha: '12345678',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Ronaldo Souza',
                    email: 'ronaldo@email.com',
                    senha: '12345678',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Ana Cruz',
                    email: 'ana@email.com',
                    senha: '12345678',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    nome: 'Mario Jorge',
                    email: 'mario@email.com',
                    senha: '12345678',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        ),

    down: async (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Usuarios', null, {})
};
