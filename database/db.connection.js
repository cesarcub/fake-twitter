const dbConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        opperatorsAliases: false,
        pool: {
            max: dbConfig.POOL.max,
            min: dbConfig.POOL.min,
            acquire: dbConfig.POOL.acquire,
            idle: dbConfig.POOL.idle
        }
    }
);

module.exports = sequelize;