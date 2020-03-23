const Sequelize = require('sequelize');
const sequelizeCx = require('./db.connection');

// Importar modelos
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');

// Inicializar modelos
const User = UserModel(sequelizeCx, Sequelize);
const Post = PostModel(sequelizeCx, Sequelize);

//Se relacionan usuarios y tweets
User.hasMany(Post, { foreignKey: 'idUser', sourceKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'idUser', sourceKey: 'idUser' });

//Se relacionan usuarios con usuarios para hacer followers
User.belongsToMany(User, { as: 'Followers', through: 'followers', foreignKey: 'idUser' });


const models = {
    User,
    Post
}

const db = {
    ...models,
    sequelizeCx
}

module.exports = db;