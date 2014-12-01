/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var bodyParser = require('body-parser');

var questions = [
    {
        question: {
            id: 1,
            type: 'text',
            src: 'Kent Glenn iets van Front end engineering?'
        },
        answers: [
            {
                id: 1,
                answer: 'Ja'
            },
            {
                id: 2,
                answer: 'Nee'
            }
        ]
    },
    {
        question: {
            id: 2,
            type: 'text',
            src: 'Kent Glenn iets van Information Management?'
        },
        answers: [
            {
                id: 1,
                answer: 'Ja'
            },
            {
                id: 2,
                answer: 'Nee'
            }
        ]
    }
];

var answers = [
    {
      questionId: 1,
      correctAnswerId: 1
    },
    {
      questionId: 2,
      correctAnswerId: 2
    }
];

// Get question
exports.question = function(req, res) {
  var index = _.random(questions.length-1);
  //todo map to remove 'correct' from answers => not needed for UI
  res.json(questions[index]);
};

// Get all answers
exports.answers = function(req, res) {
  res.json(answers);
};

// Get bad or good answer
exports.answer = function(req, res) {
  console.log(JSON.stringify(req.body));
  var questionId = req.body.questionId;
  var answerId = req.body.answerId;
  var result;
  answers.forEach(function(answer) {
    if (answer.questionId === questionId) {
      result = answer.correctAnswerId === answerId;
      return;
    }
  });
  res.json(result);
};
