module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categorias",
      [
        {
          titulo: "reactjs",
          cor: "#87CEFA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "css",
          cor: "#EE82EE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "java",
          cor: "#FFD700",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "python",
          cor: "#3CB371",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "linux",
          cor: "#FFA500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categorias", null, {});
  },
};
