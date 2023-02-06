const { Sequelize } = require("sequelize");


module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
        },
        password: {
          type: Sequelize.STRING(100),
        },
        nickname: {
          type: Sequelize.STRING(255),
        },
        stack: {
          type: Sequelize.STRING(300),
        }

      },
      {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "Users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
