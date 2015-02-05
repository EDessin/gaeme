'use strict';

var express = require('express');
var disOrDatController = require('./disordat.controller');

var router = express.Router();

router.get('/question', disOrDatController.getRandomQuestion);
router.get('/questions', disOrDatController.getQuestions);
router.get('/answers', disOrDatController.getAnswers);
router.post('/answer', disOrDatController.getAnswer);
router.get('/image/:id', disOrDatController.getImage);

module.exports = router;
