const User = require('../Models/users.model');
//const { hashPassword } = require('../Models/users.model');


// Authentication controller.
var AuthController = {};

// User Registration Logic.
AuthController.register = function(req, res, next) {
    var today = new Date();

    // Validate request.
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    // Create user.
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        idcardno: req.body.idcardno,
        fullname: req.body.fullname,
        address: req.body.address,
        contact: req.body.contact,
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


module.exports = AuthController