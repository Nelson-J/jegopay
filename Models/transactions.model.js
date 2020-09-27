const { Transaction } = require('sequelize/types');
const db = require('./db');

Transaction = function(trans) {
    this.id = trans.id;
    this.transno = trans.transno;
    this.amount = trans.amount;
    this.desc = trans.desc;
    this.pay_methods_id = trans.pay_methods_id;
}


//placeholder to get all transactions
Transaction.getAll = result => {
    const sql = 'SELECT * FROM transactions';
    db.query(sql, async function(err, res) {
        if (err) throw err;
        console.log('Result: ', res); //comment out
        result(null, res); //attach db output to response for client
    });
}

module.exports = Transaction;