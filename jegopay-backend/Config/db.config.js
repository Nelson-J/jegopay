const fs = require('fs');

module.exports = {
    HOST: 'localhost',
    USER: 'jegouser',
    PASSWORD: 'password',
    DATABASE: 'jegopay',
    SCHEMA: fs.readFileSync('./jegopay.sql').toString()
}