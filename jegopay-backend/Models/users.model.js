const { NOW } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING, unique: true },
        idcardno: { type: Sequelize.STRING },
        fullname: { type: Sequelize.TEXT },
        address: { type: Sequelize.STRING },
        contact: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        date_joined: { type: Sequelize.DATEONLY, defaultValue: NOW },
        last_login: { type: Sequelize.DATEONLY },
        is_merchant: { type: Sequelize.BOOLEAN },
        is_superuser: { type: Sequelize.BOOLEAN },
    });
    return User;
};