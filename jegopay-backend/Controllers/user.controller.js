const User = require('../Models/users.model');
const { hashPassword } = require('../Models/users.model');


// Authentication controller.
var AuthController = {};

// User Registration Logic.
AuthController.register = function(req, res) {
    var today = new Date();

    // Validate request.
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    // Create user.
    const user = new User({
        username: req.body.username,
        password: hashPassword(req.body),
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
};


findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// User Login Logic.


module.exports = {
    AuthController,
    findAll,
}