'use strict';

var express = require('express');
var controller = require('./disordat.controller');

var router = express.Router();

router.get('/question', controller.question);

module.exports = router;