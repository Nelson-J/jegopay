const express = require('express');
const router = express.Router();
const users = require('../Controllers/user.controller.js');


router.get('/users', users.findAll);
router.post('/register', users.register);

module.exports = router;