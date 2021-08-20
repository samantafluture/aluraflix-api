module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Categorias',
    [
      {
        titulo: 'reactjs',
        cor: '#87CEFA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'css',
        cor: '#EE82EE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'java',
        cor: '#FFD700',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'python',
        cor: '#3CB371',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'linux',
        cor: '#FFA500',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categorias', null, {}),
};
