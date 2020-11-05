const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

// Sync models to database tables
db.sequelize.sync().then(() => {
    console.log("Database sync");
});

const port = 3000; //set your port

app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//test
app.get('/', function(req, res) {
    res.send('Test success');
});

//handle errors
//404
app.use(function(req, res, next) {
    res.status(404);
    res.send('404 - Not Found');
});

//500
app.use(function(err, req, res, next) {
    res.status(500);
    res.send('500 - Server error');
    console.log('Error: ', err);
});

app.listen(port, function() {
    console.log('Server running at port ', port);
});