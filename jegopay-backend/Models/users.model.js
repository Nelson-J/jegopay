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
    this.last_login = user.last_login;
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
ModelUser.create = (user, result) => {

    db.execute("INSERT INTO users SET VALUES ?", [user.username, user.password, user.email, user.idcardno, user.fullname, user.address, user.contact, user.date_joined,
        user.last_login, user.is_superuser, user.is_merchant
    ], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};


// Find user by ID.
ModelUser.findById = (userId, result) => {
    db.execute('SELECT * FROM users WHERE id = ?', [userId], (err, res) => {
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

// Check if a user already exists or not.
// @param user object with id, username and password.
ModelUser.exists = (user, result) => {
    db.execute('SELECT (username, password) FROM users WHERE username = ? , password = ?', [user.username, user.password], function(err, res) {
        if (err) {
            res.status(400).send({ msg: err || "User does not exist." });
        }
        return result;
    });

}


// Hashes the password for a user object.
function hashPassword(password) {
    // TODO: Password hashing logic.
    if (password) {
        return bcrypt.hash(password, 10), (err, hash) => {
            if (err) {
                return res.status(500).send({ msg: err });
            } else { return String(hash) };
        }
    }
}

module.exports = {
    ModelUser: ModelUser,
    hashPassword: hashPassword
}