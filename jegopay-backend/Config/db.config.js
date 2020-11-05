module.exports = {
    HOST: 'localhost',
    USER: 'jegouser',
    PASSWORD: 'password',
    DATABASE: 'jegopay',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};