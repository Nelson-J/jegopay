const express = require('express');
const entity = require('../Controllers/entity.controller');

const router = express.Router();

//get all users (from //localhost:port/users)
router.get('/', entity.findAll);

//other actions to be defined

modules.exports = router;