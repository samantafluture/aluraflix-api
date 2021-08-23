module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Videos',
            [
                {
                    titulo: 'Como fazer validações de formulário com React',
                    descricao:
                        'Use a biblioteca Formik para fazer validações de formulário',
                    url: 'https://www.youtube.com/watch?v=-nYNd6EuZHU',
                    categoria_id: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    titulo: 'Cria um Design System com Figma, HTML e CSS',
                    descricao:
                        'Aprenda a criar um sistema de componentes UI reutilizáveis',
                    url: 'https://www.youtube.com/watch?v=RYDiDpW2VkM',
                    categoria_id: 15,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    titulo: 'Crie um Pomodoro Clock com React',
                    descricao:
                        'Aprenda a desenvolver um relógio Pomodoro web app',
                    url: 'https://www.youtube.com/watch?v=9EVmiQCfkuQ',
                    categoria_id: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    titulo: 'Tutorial de React Hooks',
                    descricao:
                        'Aprenda React Hooks e Styled Components avançado',
                    url: 'https://www.youtube.com/watch?v=iVRO0toVdYM',
                    categoria_id: 5,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        ),
    down: async (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Videos', null, {})
};
