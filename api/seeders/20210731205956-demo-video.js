module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Videos",
      [
        {
          titulo: "Formulário customizado com Tailwind e Google Forms",
          descricao: "Como fazer um formulário customizado com CSS e Google Forms",
          url: "https://www.youtube.com/watch?v=PSkAt5Z-jMo",
          categoria_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Ambilight com Raspberry PI e Arduino",
          descricao: "Faça seu led sincronizar com a TV e videogame",
          url: "https://www.youtube.com/watch?v=I-DcBIUsCZw",
          categoria_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Como fazer validações de formulário com React",
          descricao: "Use a biblioteca Formik para fazer validações de formulário",
          url: "https://www.youtube.com/watch?v=-nYNd6EuZHU",
          categoria_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Cria um Design System com Figma",
          descricao: "Aprenda a criar um sistema de componentes UI reutilizáveis",
          url: "https://www.youtube.com/watch?v=RYDiDpW2VkM",
          categoria_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Criando relatório com PDFMake em Node.js",
          descricao: "Nesse vídeo vamos conhecer a PDFMake, uma biblioteca que gera documentos PDF para uso do lado do servidor e do cliente em JavaScript puro",
          url: "https://www.youtube.com/watch?v=WG1EYRhny3M",
          categoria_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Crie um Pomodoro Clock com React",
          descricao: "Aprenda a desenvolver um relógio Pomodoro web app",
          url: "https://www.youtube.com/watch?v=9EVmiQCfkuQ",
          categoria_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Tutorial de React Hooks",
          descricao: "Aprenda React Hooks e Styled Components avançado",
          url: "https://www.youtube.com/watch?v=iVRO0toVdYM",
          categoria_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Criando testes na aplicação com Jest e SuperTest",
          descricao: "Realize testes de forma mais simples e automatizada em Node.js",
          url: "https://www.youtube.com/watch?v=18Dgf7lb9QA",
          categoria_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Videos", null, {});
  },
};
