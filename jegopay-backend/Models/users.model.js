const db = require('./db');
const bcrypt = require('bcrypt');

//User placeholder
ModelUser = function(user) {
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
ModelUser.getAll = result => {
    const sql = 'SELECT * FROM users';
    db.query(sql, async function(err, res) {
        if (err) throw err;
        console.log('Result: ', res); //comment out
        result(null, res); //attach db output to response for client
    });
}

// Create a user.
ModelUser.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("Error", err);
            result(err, null);
            return;
        }

        console.log("Created User: ", { id: res.insertId, username: res.insertusername });
        result(null, { id: res.insertId, username: res.insertusername })
    });
};


// Find user by ID.
ModelUser.findById = (userId, result) => {
    sql.query('SELECT * FROM users WHERE id = ${ userId }', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // user not found with id.
        result({ kind: "not_found" }, null);
    });
};

//Compare two passwords.
function comparePasswords(password, callback) {
    // TODO: Password comparison logic.
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// Hashes the password for a user object.
function hashPassword(user) {
    // TODO: Password hashing logic.
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = { ModelUser, comparePasswords, hashPassword }