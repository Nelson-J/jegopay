const express = require('express');
const users = require('../Controllers/user.controller.js');

module.exports = app => {
    app.post('/register', users.register);
    app.get('/users', users.findAll);
}