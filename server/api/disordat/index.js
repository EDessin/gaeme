'use strict';

var express = require('express');
var controller = require('./disordat.controller');

var router = express.Router();

router.get('/question', controller.question);

router.get('/answers', controller.answers);

router.post('/answer', controller.answer);

module.exports = router;
