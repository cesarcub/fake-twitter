const Sequelize = require('sequelize');
const sequelizeCx = require('./db.connection');

// Importar modelos
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
const MessageModel = require('../models/message.model');

// Inicializar modelos
const User = UserModel(sequelizeCx, Sequelize);
const Post = PostModel(sequelizeCx, Sequelize);
const Message = MessageModel(sequelizeCx, Sequelize);

//Se relacionan usuarios y tweets
User.hasMany(Post, { foreignKey: 'idUser', sourceKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'idUser', sourceKey: 'idUser' });

//Se relacionan usuarios con usuarios para hacer followers
User.belongsToMany(User, { as: 'Followers', through: 'followers', foreignKey: 'idUser' });

//Se relacionan mensajes y usuarios emisores
User.hasMany(Message, { foreignKey: 'idUserEmisor', sourceKey: 'idUser' });
Message.belongsTo(User, { foreignKey: 'idUserEmisor', sourceKey: 'idUserEmisor' });

//Se relacionan mensajes y usuarios receptores
User.hasMany(Message, { foreignKey: 'idUserReceptor', sourceKey: 'idUser' });
Message.belongsTo(User, { foreignKey: 'idUserReceptor', sourceKey: 'idUserReceptor' });

const models = {
    User,
    Post,
    Message
}

const db = {
    ...models,
    sequelizeCx
}

module.exports = db;