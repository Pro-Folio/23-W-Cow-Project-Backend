const { Sequelize } = require("sequelize");


module.exports = class Posts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(30),
        },
        title: {
          type: Sequelize.STRING(500),
        },
        image: {
          type: Sequelize.STRING(2000),
        },
        summary: {
          type: Sequelize.STRING(500),
        },
        techStack: {
          type: Sequelize.STRING(500),
        },
        period: {
          type: Sequelize.STRING(20),
        },
        date: {
          type: Sequelize.STRING(20),
        },
        detail: {
          type: Sequelize.STRING(5000),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Posts",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
