const db = require('./db');

//User placeholder
User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.idcardno = user.idcardno;
    this.fullname = user.fullname;
    this.address = user.address;
    this.contact = user.contact;
    this.date_joined = user.date_joined;
    this.is_superuser = user.is_superuser;
    this.is_merchant = user.is_merchant;
}

//placeholder to get all users
User.getAll = result => {
    const sql = 'SELECT * FROM users';
    db.query(sql, async function(err, res) {
        if (err) throw err;
        console.log('Result: ', res); //comment out
        result(null, res); //attach db output to response for client
    });
}

module.exports = User;