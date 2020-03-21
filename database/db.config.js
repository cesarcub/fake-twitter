const dbConfig = {
    HOST: "localhost",
    PORT: 3306,
    USER: "root",
    PASSWORD: "",
    DB: "faketwitter",
    DIALECT: "mysql",
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
module.exports = dbConfig;