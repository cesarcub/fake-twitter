module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message',
        {
            idMessage: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            message: Sequelize.STRING
        },
        {
            tableName: 'messages'
        }
    );
    return Message;
}