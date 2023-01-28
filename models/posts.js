const {Sequelize} = require('sequelize');


module.exports = class Posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
						userId: {
                            type: Sequelize.STRING(30)
                        },
                        title: {
                            type: Sequelize.STRING(500)
                        },
                        detail: {
                            type: Sequelize.STRING(5000)
                        },
                        image: {
                            type: Sequelize.STRING(2000)
                        },
                        public: {
                            type: Sequelize.STRING(20)
                        },


		}, {
            sequelize,
            timestamps: false,
            modelName: 'Posts',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        
    }
};