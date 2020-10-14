const User = require('../Models/users.model');
const { hashPassword } = require('../Models/users.model');


// Authentication controller.
var AuthController = {};

// User Registration Logic.
AuthController.register = function(req, res, next) {
    var today = new Date();
    params = req.body;

    // Validate request.
    if (!params) {
        res.status(400).send({
            message: "Content cannot be empty!",
        })

        if (hashPassword(params.password) !== hashPassword(params.password2)) {
            return res.status(400).send({ message: "Passwords must be the same." });
        }
        return;
    }

    // Create user.
    const user = new User({
        username: params.username,
        password: hashPassword(params.password),
        password2: params.password2,
        email: params.email,
        idcardno: params.idcardno,
        fullname: params.fullname,
        address: params.address,
        contact: params.contact,
        date_joined: today,
        //is_superuser uses default.
        //is_merchant uses default.
    });

    // Save User to db.
    User.create(user, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occured while creating the User."
        });
        else res.send(data);
    });
    next();
};

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

}

module.exports = AuthController