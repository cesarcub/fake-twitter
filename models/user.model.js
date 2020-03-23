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
            },
            password: {
                type: Sequelize.STRING
            }
        },
        {
            tableName: 'users'
        }
    );
    return User;
}