'use strict';

var express = require('express');
var disOrDatController = require('./disordat.controller');

var router = express.Router();

router.post('/question', disOrDatController.getRandomQuestion);
router.get('/questions', disOrDatController.getQuestions);
router.get('/answers', disOrDatController.getAnswers);
router.post('/answer', disOrDatController.getAnswer);

module.exports = router;
