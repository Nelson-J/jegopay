module.exports = {
    HOST: 'localhost',
    USER: 'jegouser',
    PASSWORD: 'password',
    DATABASE: 'jegopay',
    SCHEMA: `CREATE TABLE IF NOT EXISTS entities(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(15) NOT NULL,
                location VARCHAR(15) NOT NULL,
                nerd BOOLEAN DEFAULT true);`
}