module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user',
        {
            idUser: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            }
        },
        {
            tableName: 'users'
        }
    );
    return User;
}