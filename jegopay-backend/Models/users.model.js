module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: { type: Sequelize.INTEGER },
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        idcardno: { type: Sequelize.STRING },
        fullname: { type: Sequelize.TEXT },
        address: { type: Sequelize.STRING },
        contact: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        date_joined: { type: Sequelize.DATEONLY },
        last_login: { type: Sequelize.DATEONLY },
        is_merchant: { type: Sequelize.BOOLEAN },
        is_superuser: { type: Sequelize.BOOLEAN },
    });
    return User;
};