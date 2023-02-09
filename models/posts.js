const { Sequelize } = require("sequelize");

module.exports = class Posts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(500),
          allowNull: false,
          validate: {
            notNull: {
              msg: "title 입력되지 않았습니다.",
            },
            // isValidName: function (value) {
            //   if (!value.match(/^[a-zA-Z]+$/)) {
            //     throw new Error("Name must only contain letters.");
            //   }
            // },
          },
        },
        image: {
          type: Sequelize.STRING(2000),
          allowNull: false,
          validate: {
            notNull: {
              msg: "image 입력되지 않았습니다.",
            },
          },
        },
        summary: {
          type: Sequelize.STRING(500),
          allowNull: false,
          validate: {
            notNull: {
              msg: "summary 입력되지 않았습니다.",
            },
          },
        },
        techStack: {
          type: Sequelize.STRING(500),
          allowNull: false,
          validate: {
            notNull: {
              msg: "teckStack 입력되지 않았습니다.",
            },
          },
        },
        period: {
          type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: {
              msg: "period 입력되지 않았습니다.",
            },
          },
        },
        date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          // defaultValue: function () {
          //   return moment().tz("Asia/Seoul").format();
          // },
        },
        detail: {
          type: Sequelize.STRING(5000),
          allowNull: false,
          validate: {
            notNull: {
              msg: "detail 입력되지 않았습니다.",
            },
          },
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
  static associate(db) {
    db.Posts.belongsTo(db.User, { foreignKey: "UserId", sourceKey: "id" });
  }
};
