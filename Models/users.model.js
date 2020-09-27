const db = require('./db');

//User placeholder
User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.address = user.address;
    this.contact = user.contact;
    this.is_superuser = user.is_superuser;
    this.is_user = user.is_user;
    this.is_merchant = user.is_user;
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