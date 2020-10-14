const entity = require('../Models/entity.model');

//placeholder for controller methods

exports.findAll = function(req, res) {
    entity.getAll(function(err, result) {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        res.send(result);
    });
}