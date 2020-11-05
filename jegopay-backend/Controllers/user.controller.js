const model = require('../Models/users.model');
const User = model.ModelUser;
const hashPassword = model.hashPassword;

// Authentication controller.
var AuthController = {};

// User Registration Logic.
AuthController.register = function(req, res, next) {
    var today = new Date();
    var params = req.body;

    // Validate request.
    if (!params.username || !params.password) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }


    if (params.password2 !== params.password) {
        res.status(400).send({
            message: "Passwords must be the same."
        })
    }

    // Create user.
    const user = new User({
        username: params.username,
        password: hashPassword(params.password),
        email: params.email,
        idcardno: params.idcardno,
        fullname: params.fullname,
        address: params.address,
        contact: params.contact,
        date_joined: today,
        last_login: null,
        is_superuser: 0,
        is_merchant: 1
    });

    // Save User to db.
    User.create(user, function(err, data) {
        if (err) res.status(500).send({
            message: err.message || "Some error occured while creating the User."
        });
        res.end(JSON.stringify(data));
    });
    next();
}

// Retrieve all registered users.
AuthController.findAll = function(req, res, next) {
    User.getAll(function(err, result) {

        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users."
            });
        }
        res.send(JSON.stringify(result));
    });
    next();
}

// User Login Logic.
AuthController.authenticate = function(req, res, next) {
    var params = req.body;
    User.exists(params, (err, result) => {
        if (err) {
            throw err;
        }

        if (!result.length) {
            return res.status(401).send({ msg: "Username or password incorrect." });
        }

    });
}

module.exports = AuthController