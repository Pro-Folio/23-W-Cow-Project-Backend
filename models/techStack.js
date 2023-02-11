const { Sequelize } = require("sequelize");


module.exports = class TechStack extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        portfolioId: {
          type: Sequelize.STRING(30),
        },
        techStack: {
          type: Sequelize.STRING(100),
        },

      },
      {
        sequelize,
        timestamps: false,
        modelName: "TechStack",
        tableName: "TechStacks",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    
  }
};
