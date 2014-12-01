'use strict';

var express = require('express');
var disOrDatController = require('./disordat.controller');

var router = express.Router();

router.get('/question', disOrDatController.question);

router.get('/questions', disOrDatController.questions);

router.get('/answers', disOrDatController.answers);

router.post('/answer', disOrDatController.answer);

module.exports = router;
