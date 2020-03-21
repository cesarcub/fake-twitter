module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post',
        {
            idPost: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            message: Sequelize.STRING
        },
        {
            tableName: 'posts'
        }
    );
    return Post;
}