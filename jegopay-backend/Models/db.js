const mysql = require('mysql');
const dbconfig = require('../Config/db.config');

dbconnection = mysql.createConnection({
    host : dbconfig.HOST,
    user : dbconfig.USER,
    password : dbconfig.PASSWORD,
    multipleStatements : true
});

//initialise the database to be used;
//dbcreate = `CREATE DATABASE IF NOT EXISTS ${dbconfig.DATABASE};`;

dbconnection.connect(function(err, result){
    if(err) throw err;
    console.log('Server connected');
});