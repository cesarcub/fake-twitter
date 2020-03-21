const Sequelize = require('sequelize');
const sequelizeCx = require('./db.connection');

// Importar modelos
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');

// Inicializar modelos
const User = UserModel(sequelizeCx, Sequelize);
const Post = PostModel(sequelizeCx, Sequelize);

//Se relacionan
User.hasMany(Post, { foreignKey: 'idPost', sourceKey: 'idUser' });
Post.belongsTo(User, { foreignKey: 'idUser', sourceKey: 'idPost' });

const models = {
    User,
    Post
}

const db = {
    ...models,
    sequelizeCx
}

module.exports = db;