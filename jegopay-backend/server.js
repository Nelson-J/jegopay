const express = require('express');
const bodyParser = require('body-parser');
const entities = require('./Routes/entity.routes');
const users = require('./Routes/user.routes');

const port = 3000; //set your port

app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//test
app.get('/', function(req, res) {
    res.send('Test success');
});

//Accept urls of type host:port/users
app.use('/entities', entities); //returns an empty object at the moment since database is empty

app.use('', users);

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