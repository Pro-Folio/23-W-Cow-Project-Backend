const { Sequelize } = require('sequelize');

module.exports = class Posts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(255),
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
        startDate: {
          type: Sequelize.STRING(20),
        },
        endDate: {
          type: Sequelize.STRING(20),
        },
        date: {
          type: Sequelize.STRING(100),
        },
        detail: {
          type: Sequelize.STRING(5000),
        },
        techStack: {
          type: Sequelize.JSON(2000),
        },
        userId: {
          type: Sequelize.INTEGER(200),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Post',
        tableName: 'Posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {}
};
