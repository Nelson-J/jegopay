const db = require('./db');


Pay_Method = function(paymethod) {
    this.id = paymethod.id;
    this.type = paymethod.type;
    this.desc = paymethod.desc;
}

//placeholder to get all payment methods
Pay_Method.getAll = result => {
    const sql = 'SELECT * FROM pay_methods';
    db.query(sql, async function(err, res) {
        if (err) throw err;
        console.log('Result: ', res); //comment out
        result(null, res); //attach db output to response for client
    });
}

module.exports = Pay_Method;